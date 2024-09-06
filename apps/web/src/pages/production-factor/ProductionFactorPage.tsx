import { useEffect, useState } from 'react'
import ProductionFactorCard from '../../components/common/card/ProductionFactorCard'
import RadarChart from '../../components/common/charts/RadarChart'
import axios from 'axios'
import type { PredictResult } from '../../types/interfaces'

const ProductionFactorPage = () => {
  const [data, setData] = useState<number[]>([])
  const [goodData, setGoodData] = useState<number[]>([
    0.4, 0.35, 52, 30, 0.5, 0.5, 0.5, 0.45
  ])

  const fetchPower = async () => {
    try {
      const predictResult = await axios
        .get<PredictResult[]>('http://127.0.0.1:4000/predict_result')
        .then((result) => result.data)

      if (predictResult.length > 0) {
        const target = predictResult[0]

        const totalVibrationRms =
          (target.x_rms || 0) * (target.x_rms || 0) +
          (target.y_rms || 0) * (target.y_rms || 0) +
          (target.z_rms || 0) * (target.z_rms || 0)

        setData([
          target.x_rms || 0,
          target.x_std || 0,
          target.x_impact_factor || 0,
          target.x_crest_factor || 0,
          target.pf_p2p_1 || 0,
          target.pf_p2p_2 || 0,
          target.pf_p2p_3 || 0,
          Math.sqrt(totalVibrationRms)
        ])
      }
    } catch (error) {
      console.error('Error fetching data:', error)
    }
  }

  useEffect(() => {
    fetchPower()

    const intervalId = setInterval(() => {
      fetchPower()
    }, 1000)

    return () => clearInterval(intervalId)
  }, [])

  const titles = [
    'RMS',
    'STD',
    'IMPACT FACTOR',
    'CREST FACTOR',
    'Peek2Peek',
    'Peek2Peek',
    'Peek2Peek',
    'RMS'
  ]

  const categories = [
    'X축 진동',
    'X축 진동',
    'X축 진동',
    'X축 진동',
    '#1 Phase Current',
    '#2 Phase Current',
    '#3 Phase Current',
    '총 진동량'
  ]

  const series = [
    {
      name: 'GOOD',
      data: goodData
    },
    {
      name: 'NOW',
      data
    }
  ]

  return (
    <div>
      <RadarChart series={series} categories={titles} />
      <div className="mt-4 grid grid-cols-4 gap-4">
        {titles.map((title, index) => (
          <ProductionFactorCard
            title={title}
            category={categories[index]}
            key={index}
            data={{ good: series[0].data[index], now: series[1].data[index] }}
          />
        ))}
      </div>
    </div>
  )
}

export default ProductionFactorPage
