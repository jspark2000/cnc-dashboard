import ReactApexChart, { Props as ChartProps } from 'react-apexcharts'

const LineChart = ({
  series,
  categories,
  type,
  height = 200
}: {
  series: ChartProps['series']
  categories: any[]
  type?: 'category' | 'datetime' | 'numeric'
  height?: number | string
}) => {
  return (
    <div className="w-full">
      <ReactApexChart
        series={series}
        type="line"
        height={height}
        width={'100%'}
        options={{
          chart: {
            height,
            type: 'line',
            toolbar: {
              show: false
            }
          },
          dataLabels: {
            enabled: false
          },
          // legend: {
          //   show: true,
          //   position: 'bottom',
          //   horizontalAlign: 'right',
          //   offsetY: -5,
          //   floating: true,
          //   markers: {}
          // },
          stroke: {
            curve: 'straight',
            width: 1
          },
          xaxis: {
            // labels: {
            //   style: {
            //     // colors: 'gray',
            //     fontSize: '12px'
            //   }
            // },
            tickAmount: 15,
            // stepSize: 5,
            categories: categories,
            type: type ? type : 'category'
          },
          yaxis: {
            labels: {
              formatter(val) {
                if (typeof val === 'number' && val >= 1000) {
                  const exponent = Math.floor(Math.log10(val))
                  const base = val / Math.pow(10, exponent)
                  return base.toFixed(1) + 'E' + exponent
                }
                return val.toString()
              }
            }
          }
        }}
      />
    </div>
  )
}

export default LineChart
