import ReactApexChart from 'react-apexcharts'

const StackedColumnChart: React.FC = () => {
  const serires = [
    {
      name: 'MACHINE A',
      data: [44, 55, 41, 67, 22, 43]
    },
    {
      name: 'MACHINE B',
      data: [13, 23, 20, 8, 13, 27]
    },
    {
      name: 'MACHINE C',
      data: [11, 17, 15, 15, 21, 14]
    }
  ]

  return (
    <div className="flex h-[350px] bg-white">
      <ReactApexChart
        type={'bar'}
        series={serires}
        height={350}
        width={900}
        options={{
          chart: {
            stacked: true,
            toolbar: {
              show: false
            },
            zoom: {
              enabled: false
            }
          },
          responsive: [
            {
              breakpoint: 480,
              options: {
                legend: {
                  position: 'bottom',
                  offsetX: -10,
                  offsetY: 0
                }
              }
            }
          ],
          plotOptions: {
            bar: {
              horizontal: false,
              borderRadius: 0,
              dataLabels: {
                total: {
                  enabled: true,
                  style: {
                    fontSize: '13px',
                    fontWeight: 900
                  }
                }
              }
            }
          },
          xaxis: {
            type: 'category',
            categories: ['월', '화', '수', '목', '금', '토', '일']
          },
          legend: {
            position: 'right',
            offsetY: 0
          },
          fill: {
            opacity: 1
          }
        }}
      />
    </div>
  )
}

export default StackedColumnChart
