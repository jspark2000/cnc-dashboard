import { useEffect, useState } from 'react'
import FFT from 'fft.js'
import FFT2DComponent from './FFT2DComponent'
import FFT3DComponent from './FFT3DComponent'
import STFTSpectogram from './STFTSpectogram'
import config from '@/libs/config'
import {
  SocketAction,
  SocketSourceType,
  type FFTChartData,
  type SocketMessage,
  type VibrationState
} from '@/types'

interface Props {
  col: 'x' | 'y' | 'z' | 'current'
  magnitudeThreshold?: number
}

const FFTSection: React.FC<Props> = ({
  col = 'current',
  magnitudeThreshold = 500
}) => {
  const [loading, setLoading] = useState<number>(0)
  const [time, setTime] = useState<string>('')
  const [data, setData] = useState<FFTChartData[]>([])
  const [spectrogramData, setSpectrogramData] = useState<{
    t: number[]
    f: number[]
    Zxx: number[][]
  } | null>(null)
  const [_, setSignalBuffer] = useState<number[]>([])

  useEffect(() => {
    setSignalBuffer([])
    setLoading(0)
    setData([])
    setSpectrogramData(null)

    const socket = new WebSocket(config.WEBSOCKET_URL)

    socket.onopen = (_) => {
      socket.send(
        JSON.stringify({
          action: SocketAction.SUBSCRIBE,
          source: 'vibration'
        })
      )
    }

    socket.onmessage = (event) => {
      const { data, source } = JSON.parse(
        event.data
      ) as SocketMessage<VibrationState>

      if (source !== SocketSourceType.VIBRATION) return

      const newSignal = data[col]
      setSignalBuffer((prevBuffer) => {
        setTime(data.time.pop() ?? '')
        const updatedBuffer = [...prevBuffer, ...newSignal]
        setLoading((updatedBuffer.length / 25000) * 100)
        if (updatedBuffer.length >= 25000) {
          const latestBuffer = updatedBuffer.slice(-25000)
          processFFT(latestBuffer)
          const spectrogramResult = performSTFT(latestBuffer)
          setSpectrogramData(spectrogramResult)
          return latestBuffer
        }
        return updatedBuffer
      })
    }

    return () => socket.close()
  }, [col])

  const processFFT = (data: number[]) => {
    const segmentSize = 4096
    const segments = Math.min(Math.floor(data.length / 5000), 10)

    const fftData: FFTChartData[] = []

    for (let i = 0; i < segments; i++) {
      const segment = data.slice(i * segmentSize, (i + 1) * segmentSize)
      const fftResult = performFFT(segment)

      const segmentX = Array(segment.length).fill(i + 1)
      const segmentY = fftResult.freq
      const segmentZ = fftResult.magnitude
      const colors = segmentZ.map((mag) =>
        mag >= magnitudeThreshold ? 'red' : 'blue'
      )

      fftData.push({ x: segmentX, y: segmentY, z: segmentZ, colors })
    }

    setData(fftData)
  }

  const performFFT = (
    data: number[]
  ): { magnitude: number[]; freq: number[] } => {
    const f = new FFT(data.length)
    const out = f.createComplexArray()
    f.realTransform(out, data)
    f.completeSpectrum(out)

    const magnitude: number[] = []
    const freq: number[] = []
    for (let i = 0; i < out.length / 2; i++) {
      const re = out[2 * i]
      const im = out[2 * i + 1]
      magnitude.push(Math.sqrt(re * re + im * im))
      freq.push(i)
    }

    return { magnitude, freq }
  }

  const performSTFT = (
    signal: number[]
  ): { t: number[]; f: number[]; Zxx: number[][] } => {
    const fs = 5000
    const nperseg = 256
    const noverlap = 128
    const nfft = 1024

    const step = nperseg - noverlap
    const segments = Math.ceil((signal.length - noverlap) / step)
    const Zxx: number[][] = []

    for (let i = 0; i < segments; i++) {
      const start = i * step
      const end = start + nperseg
      const segment = signal.slice(start, end)
      if (segment.length < nperseg) {
        break
      }
      const paddedSegment = padSegment(segment, nfft)
      const fftResult = performFFT(paddedSegment)
      Zxx.push(fftResult.magnitude)
    }

    const t = Array.from({ length: segments }, (_, i) => (i * step) / fs)
    const f = Array.from({ length: nfft / 2 + 1 }, (_, i) => (i * fs) / nfft)

    return { t, f, Zxx }
  }

  const padSegment = (segment: number[], nfft: number): number[] => {
    const paddedSegment = new Array(nfft).fill(0)
    for (let i = 0; i < segment.length; i++) {
      paddedSegment[i] = segment[i]
    }
    return paddedSegment
  }

  return (
    <div className="grid h-full w-full grid-cols-2 gap-3">
      <p className="col-span-2">CNC 데이터 시각: {time}</p>
      {loading < 100 && <p className="col-span-2">데이터 로딩: {loading}%</p>}
      <div>
        {data.length > 0 && (
          <div className="mb-5 h-[400px]">
            <FFT2DComponent data={data} />
          </div>
        )}
        {data.length > 0 && (
          <div className="h-[400px]">
            <FFT3DComponent data={data} />{' '}
          </div>
        )}
      </div>
      {spectrogramData && (
        <div className="h-[820px]">
          {' '}
          <STFTSpectogram spectrogramData={spectrogramData} />{' '}
        </div>
      )}
    </div>
  )
}

export default FFTSection
