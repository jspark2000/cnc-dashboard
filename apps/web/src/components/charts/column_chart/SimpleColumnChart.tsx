import ReactApexChart from 'react-apexcharts'

interface SimpleColumnChartProps {
  data: number[]
  categories: string[]
  title?: string
}

const SimpleColumnChart: React.FC<SimpleColumnChartProps> = ({
  data,
  categories,
  title
}: {
  data: number[]
  categories: string[]
  title?: string
}) => {
  const series = [
    {
      data
    }
  ]

  return (
    <div className="flex h-[170px] bg-white">
      <ReactApexChart
        type={'bar'}
        width={300}
        height={170}
        series={series}
        options={{
          chart: {
            toolbar: {
              show: false
            },
            zoom: {
              enabled: false
            }
          },
          plotOptions: {
            bar: {
              columnWidth: '50%',
              distributed: true
            }
          },
          dataLabels: {
            enabled: true
          },
          stroke: {
            show: true,
            width: 1,
            colors: ['transparent']
          },
          xaxis: {
            categories
          },
          yaxis: {
            title: {
              text: title
            }
          },
          legend: {
            show: false
          },
          fill: {
            opacity: 1
          }
        }}
      />
    </div>
  )
}

export default SimpleColumnChart
