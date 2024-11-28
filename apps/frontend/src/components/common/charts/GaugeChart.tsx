import ReactApexChart, { Props as ChartProps } from 'react-apexcharts'

const GaugeChart = ({
  series,
  label
}: {
  series: ChartProps['series']
  label: string
}) => {
  return (
    <div>
      <ReactApexChart
        options={{
          series: series,
          chart: {
            type: 'radialBar',
            offsetY: -20,
            sparkline: {
              enabled: true
            }
          },
          plotOptions: {
            radialBar: {
              startAngle: -90,
              endAngle: 90,
              track: {
                background: '#e7e7e7',
                strokeWidth: '97%',
                margin: 5, // margin is in pixels
                dropShadow: {
                  enabled: true,
                  top: 2,
                  left: 0,
                  color: '#999',
                  opacity: 1,
                  blur: 2
                }
              },
              dataLabels: {
                name: {
                  show: false
                },
                value: {
                  offsetY: -2,
                  fontSize: '22px'
                }
              }
            }
          },
          grid: {
            padding: {
              top: -10
            }
          },
          fill: {
            type: 'gradient',
            gradient: {
              shade: 'light',
              shadeIntensity: 0.4,
              inverseColors: false,
              opacityFrom: 1,
              opacityTo: 1,
              stops: [0, 50, 53, 91]
            }
          },
          title: {
            text: '',
            align: 'center',
            style: {
              fontSize: '0px'
            }
          },
          labels: [label]
        }}
        series={series}
        type="radialBar"
        height={240}
      />
      <div>
        <h1 className="text-center text-xs">{label}</h1>
      </div>
    </div>
  )
}

export default GaugeChart
