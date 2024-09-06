import React, { useEffect, useState } from 'react'
import FFT from 'fft.js'
import FFT2DComponent from './components/fft/FFT2DComponent'
import FFT3DComponent from './components/fft/FFT3DComponent'
import STFTSpectogram from './components/stft/STFTSpectogram'
import { io } from 'socket.io-client'
import type { CNCTempData } from '../../utils/cncData'
import OrbitChart from './components/orbit/Orbit'

interface FFTData {
  x: number[]
  y: number[]
  z: number[]
  colors: string[]
}

interface VibrationSectionProps {
  col: 'x' | 'y' | 'z' | 'current'
  magnitudeThreshold?: number
}

const VibrationSection: React.FC<VibrationSectionProps> = ({
  col = 'current',
  magnitudeThreshold = 500
}) => {
  const [loading, setLoading] = useState<number>(0)
  const [time, setTime] = useState<string>('')
  const [data, setData] = useState<FFTData[]>([])
  const [orbitData, setOrbitData] = useState<CNCTempData>()
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

    const socket = new WebSocket('ws://localhost:4000/mqtt')

    socket.onopen = (_) => {
      console.log('Connected to the server')
    }

    socket.onmessage = (event) => {
      const data = event.data as CNCTempData

      console.log(data)

      const newSignal = data[col]
      setSignalBuffer((prevBuffer) => {
        setTime(data.time.pop() ?? '')
        setOrbitData(data)
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

    const fftData: FFTData[] = []

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
    <div className="grid grid-cols-2 gap-3">
      <p className="col-span-2">CNC 데이터 시각: {time}</p>
      {loading < 100 && <p className="col-span-2">데이터 로딩: {loading}%</p>}
      <div className="flex h-[300px] flex-col">
        {data.length > 0 && <FFT2DComponent data={data} />}
      </div>
      {spectrogramData && <STFTSpectogram spectrogramData={spectrogramData} />}
      {data.length > 0 && <FFT3DComponent data={data} />}
      {/* {orbitData && <OrbitChart data={orbitData} />} */}
    </div>
  )
}

export default VibrationSection
