import { useEffect, useState } from 'react'
import ProductionFactorCard from '../../components/common/card/ProductionFactorCard'
import RadarChart from '../../components/common/charts/RadarChart'

const ProductionFactorPage = () => {
  const [data, setData] = useState<number[]>([])

  const fetchPower = async () => {
    try {
      const powerResponse = await fetch(
        'http://127.0.0.1:8002/production-factor/Apparent_Power_Va3'
      )
      const powerResult = (await powerResponse.json()) as any

      const currentResponse = await fetch(
        'http://127.0.0.1:8002/production-mean-and-rms/Line_Current_L3'
      )
      const currentResult = (await currentResponse.json()) as any

      const voltageResponse = await fetch(
        'http://127.0.0.1:8002/production-mean-and-rms/Line_Voltage_V31'
      )
      const voltageResult = (await voltageResponse.json()) as any

      setData([
        powerResult.rms,
        powerResult.mean,
        powerResult.impact_factor,
        powerResult.crest_factor,
        currentResult.rms,
        currentResult.mean,
        voltageResult.rms,
        voltageResult.mean
      ])
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
    'MEAN',
    'RMS',
    'IMPACT FACTOR',
    'CREST FACTOR',
    'MEAN',
    'RMS',
    'MEAN',
    'RMS'
  ]

  const categories = [
    'Apparent_Power_Va3',
    'Apparent_Power_Va3',
    'Apparent_Power_Va3',
    'Apparent_Power_Va3',
    'Line_Current_L3',
    'Line_Current_L3',
    'Line_Voltage_V31',
    'Line_Voltage_V31'
  ]

  const series = [
    {
      name: 'GOOD',
      data: [7.349, 58, 16.94, 59.18, 65.42, 80, 21, 85]
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
