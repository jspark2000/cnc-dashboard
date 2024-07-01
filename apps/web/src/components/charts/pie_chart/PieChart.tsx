import ReactApexChart from 'react-apexcharts'

const PieChart: React.FC = () => {
  const series = [45, 55]

  return (
    <div className="flex h-[350px] items-center justify-center bg-white">
      <ReactApexChart
        type={'donut'}
        series={series}
        width={300}
        height={350}
        options={{
          responsive: [
            {
              breakpoint: 480,
              options: {}
            }
          ]
        }}
      />
    </div>
  )
}

export default PieChart
