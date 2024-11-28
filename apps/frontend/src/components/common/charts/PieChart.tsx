import ReactApexChart, { Props as ChartProps } from 'react-apexcharts'

const PieChart = ({
  series,
  labels,
  title,
  height = 250
}: {
  series: ChartProps['series']
  labels: any[]
  title?: string
  height?: number | string
}) => {
  return (
    <div className="p-4">
      <ReactApexChart
        series={series}
        type="donut"
        height={height}
        width={'100%'}
        options={{
          chart: {
            type: 'donut'
          },
          plotOptions: {
            pie: {
              donut: {
                size: '60%'
              }
            }
          },
          title: {
            text: title,
            align: 'center'
          },
          series: series,
          labels: labels,
          legend: {
            show: true,
            position: 'top'
          }
        }}
      />
    </div>
  )
}

export default PieChart
