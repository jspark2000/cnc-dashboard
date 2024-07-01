import ReactApexChart from 'react-apexcharts'

interface SemiCircleGaugeProps {
  color?: string
  percentage?: number
}

const SemiCircleGauge: React.FC<SemiCircleGaugeProps> = ({
  color,
  percentage
}: {
  color?: string
  percentage?: number
}) => {
  const series = [percentage ?? 80]

  return (
    <div className="flex h-[150px] justify-center bg-white">
      <ReactApexChart
        type={'radialBar'}
        series={series}
        height={300}
        width={250}
        options={{
          plotOptions: {
            radialBar: {
              startAngle: -90,
              endAngle: 90,
              dataLabels: {
                name: {
                  show: false
                },
                value: {
                  offsetY: -2,
                  fontSize: '18px'
                }
              }
            }
          },
          fill: {
            colors: [color ?? '#000']
          },
          labels: ['Percentage']
        }}
      />
    </div>
  )
}

export default SemiCircleGauge
