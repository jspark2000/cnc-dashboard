import ProductionFactorCard from '../../components/common/card/ProductionFactorCard'
import RadarChart from '../../components/common/charts/RadarChart'

const ProductionFactorPage = () => {
  const categories = [
    'Apparent_Power_Va3 MEAN',
    'Apparent_Power_Va3 RMS',
    'Apparent_Power_Va3 IMPACT FACTOR',
    'Apparent_Power_Va3 CREST FACTOR',
    'Cushion_Position',
    'Clamp_Open_Position',
    'Average_Back_Pressure',
    'Plasticizing_Position'
  ]
  const series = [
    {
      name: 'GOOD',
      data: [7.349, 58, 16.94, 59.18, 65.42, 80, 21, 85]
    },
    {
      name: 'NOW',
      data: [5, 57, 16.67, 58.72, 65.38, 81, 19.5, 85.1]
    }
  ]

  return (
    <div>
      {/* <h1>Production Factor</h1> */}
      <RadarChart series={series} categories={categories} />
      <div className="mt-4 grid grid-cols-4 gap-4">
        {categories.map((category, index) => (
          <ProductionFactorCard
            title={category}
            key={index}
            data={{ good: series[0].data[index], now: series[1].data[index] }}
          />
        ))}
      </div>
    </div>
  )
}

export default ProductionFactorPage
