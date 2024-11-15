import ReactApexChart, { Props as ChartProps } from 'react-apexcharts'
import { CNCData } from '../../../libs/utils/cncData'
import { formatTime } from '../../../libs/utils/formatTime'

const ToolAreaChart = ({
  data,
  series
}: {
  data: CNCData[]
  series: ChartProps['series']
}) => {
  return (
    <div className="w-full">
      <ReactApexChart
        options={{
          chart: {
            type: 'line',
            animations: {
              enabled: true,
              easing: 'linear',
              dynamicAnimation: {
                speed: 1000
              }
            },
            zoom: {
              enabled: false
            }
          },
          dataLabels: {
            enabled: false
          },
          stroke: {
            curve: 'straight',
            width: 1
          },
          title: {
            text: '',
            align: 'left'
          },
          grid: {
            row: {
              colors: ['transparent'],
              opacity: 0.5
            }
          },
          xaxis: {
            categories: data.map((d) => formatTime(d.timestamp))
          }
        }}
        series={series}
        type="line"
        width={'100%'}
        height={350}
      />
    </div>
  )
}

export default ToolAreaChart
