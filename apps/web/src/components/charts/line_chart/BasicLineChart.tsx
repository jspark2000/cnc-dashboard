import ReactApexChart from 'react-apexcharts'

const BasicLineChart: React.FC = () => {
  const generateRandomArray = (size: number, min: number, max: number) => {
    const randomArray = []
    for (let i = 0; i < size; i++) {
      const randomNum = Math.floor(Math.random() * (max - min + 1)) + min
      randomArray.push(randomNum)
    }
    return randomArray
  }

  const serires = [
    {
      name: '스핀들부하',
      data: generateRandomArray(125, 5, 7)
    },
    {
      name: '스핀들전류',
      data: generateRandomArray(125, 4, 6)
    }
  ]

  return (
    <div className="flex h-[350px] bg-white w-full">
      <ReactApexChart
        type={'line'}
        width={1700}
        height={350}
        series={serires}
        options={{
          chart: {
            type: 'line',
            toolbar: {
              show: false
            },
            zoom: {
              enabled: false
            }
          },
          dataLabels: {
            enabled: false
          },
          stroke: {
            curve: 'smooth',
            width: 3
          },
          grid: {
            row: {
              colors: ['#f3f3f3', 'transparent'],
              opacity: 0.5
            }
          },
          legend: {
            position: 'bottom',
            offsetY: 5
          },
          yaxis: {
            min: 0,
            max: 10
          },
          xaxis: {
            type: 'numeric',
            tickAmount: 20,
            title: {
              text: '가공수량 (No.)',
              offsetY: -5
            }
          },
          markers: {
            size: 4
          }
        }}
      />
    </div>
  )
}

export default BasicLineChart
