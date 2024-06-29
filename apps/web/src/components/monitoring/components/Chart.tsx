import ReactApexChart, { Props as ChartProps } from 'react-apexcharts'
import { CNCData } from '../../../utils/cncData'
import { formatTime } from '../../../utils/formatTime'

const Chart = ({
  data,
  series
}: {
  data: CNCData[]
  series: ChartProps['series']
}) => {
  return (
    <div className="flex">
      <div className="h-[700px] w-4/5">
        <ReactApexChart
          options={{
            chart: {
              type: 'line',
              height: 450,
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
              curve: 'straight'
            },
            title: {
              text: 'CNC Data',
              align: 'left'
            },
            grid: {
              row: {
                colors: ['#f3f3f3', 'transparent'],
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
          height={700}
        />
      </div>
    </div>
  )
}

export default Chart
