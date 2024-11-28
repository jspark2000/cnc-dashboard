import { useState } from 'react'
import ProductionFactorCard from './ProductionFactorCard'
import RadarChart from '@/components/common/charts/RadarChart'

const ProductionFactorPage = () => {
  const [data, setData] = useState<number[]>([
    5.96, 4.83, 4.75, 4.45, 4.29, 3.59, 3.15, 2.51
  ])
  const [goodData, setGoodData] = useState<number[]>([
    5.01, 4.53, 4.82, 4.45, 4.22, 3.57, 3.2, 2.0
  ])

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
      <div className="mt-4 grid grid-cols-4 gap-4 px-4">
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
