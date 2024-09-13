import { useEffect, useState } from 'react'
import ProductionFactorCard from '../../components/common/card/ProductionFactorCard'
import RadarChart from '../../components/common/charts/RadarChart'
import axios from 'axios'
import type { PredictResult } from '../../types/interfaces'

const ProductionFactorPage = () => {
  const [data, setData] = useState<number[]>([
    5.96, 4.83, 4.75, 4.45, 4.29, 3.59, 3.15, 2.51
  ])
  const [goodData, setGoodData] = useState<number[]>([
    5.01, 4.53, 4.82, 4.45, 4.22, 3.57, 3.2, 2.0
  ])

  // const fetchPower = async () => {
  //   try {
  //     const predictResult = await axios
  //       .get<PredictResult[]>('http://127.0.0.1:4000/predict_result')
  //       .then((result) => result.data)

  //     if (predictResult.length > 0) {
  //       const target = predictResult[0]

  //       const totalVibrationRms =
  //         (target.x_rms || 0) * (target.x_rms || 0) +
  //         (target.y_rms || 0) * (target.y_rms || 0) +
  //         (target.z_rms || 0) * (target.z_rms || 0)

  //       setData([
  //         target.x_rms || 0,
  //         target.x_std || 0,
  //         target.x_impact_factor || 0,
  //         target.x_crest_factor || 0,
  //         target.pf_p2p_1 || 0,
  //         target.pf_p2p_2 || 0,
  //         target.pf_p2p_3 || 0,
  //         Math.sqrt(totalVibrationRms)
  //       ])
  //     }
  //   } catch (error) {
  //     console.error('Error fetching data:', error)
  //   }
  // }

  // useEffect(() => {
  //   fetchPower()

  //   const intervalId = setInterval(() => {
  //     fetchPower()
  //   }, 1000)

  //   return () => clearInterval(intervalId)
  // }, [])

  const titles = [
    'Peak',
    'Mean',
    'Frequency Centroid',
    'Mean',
    'MPS',
    'RMS',
    'Frequency Centroid',
    'Frequency Centroid'
  ]

  const categories = [
    'Force_Z',
    'Accer_X',
    'Accer_Z',
    'Force_Z',
    'Force_Z',
    'Force_Z',
    'Accer_X',
    'Force_X'
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
