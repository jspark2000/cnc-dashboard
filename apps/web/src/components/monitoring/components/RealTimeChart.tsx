import ReactApexChart, { Props as ChartProps } from 'react-apexcharts'
import { CNCData } from '../../../utils/cncData'
import { formatTime } from '../../../utils/formatTime'

const RealTimeChart = ({
  data,
  series
}: {
  data: CNCData[]
  series: ChartProps['series']
}) => {
  return (
    <div className="flex">
      <div className="w-4/5">
        <ReactApexChart
          options={{
            chart: {
              type: 'line',
              height: 350,
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
          width={1200}
          height={350}
        />
      </div>
    </div>
  )
}

export default RealTimeChart
