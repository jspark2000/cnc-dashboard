import ReactApexChart, { Props as ChartProps } from 'react-apexcharts'

const LineChart = ({
  series,
  categories
}: {
  series: ChartProps['series']
  categories: any[]
}) => {
  return (
    <div>
      <ReactApexChart
        options={{
          chart: {
            height: 200,
            type: 'line',
            toolbar: {
              show: false
            }
          },
          dataLabels: {
            enabled: false
          },
          legend: {
            show: true,
            position: 'bottom',
            horizontalAlign: 'right',
            offsetY: -5,
            floating: true,
            markers: {}
          },
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
            categories: categories
          }
        }}
        series={series}
        type="line"
        height={200}
        width={'100%'}
      />
    </div>
  )
}

export default LineChart
