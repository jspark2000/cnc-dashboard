import { useEffect, useState } from 'react'
import { generateRandomData } from '../../utils/random'
import FFTChart from './components/FFTChart'

const VibrationFFTSection: React.FC = () => {
  const initialSeries = Array.from({ length: 128 }, () =>
    generateRandomData(0, 1)
  )

  const [vibrationSeries, setVibrationSeries] =
    useState<number[]>(initialSeries)

  useEffect(() => {
    const interval = setInterval(() => {
      setVibrationSeries((prevSeries) => {
        const newSeries = [...prevSeries.slice(1), generateRandomData(0, 5)]
        return newSeries
      })
    }, 1000)

    return () => clearInterval(interval)
  }, [])

  return <FFTChart series={vibrationSeries} title="진동 FFT 테이블" />
}

export default VibrationFFTSection
