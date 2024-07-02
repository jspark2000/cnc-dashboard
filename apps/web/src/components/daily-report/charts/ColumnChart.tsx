import ReactApexChart, { Props as ChartProps } from 'react-apexcharts'

const ColumnChart = ({series, labels }: {series: ChartProps['series'], labels: any[]}) => {

  return (
    <div>
      <ReactApexChart options={
        {
          chart: {
          height: 150,
          type: 'bar',
          toolbar: {
            show: false
          }
        },
        plotOptions: {
          bar: {
            columnWidth: '45%',
            distributed: true,
          }
        },
        dataLabels: {
          enabled: true
        },
        legend: {
          show: false
        },
        xaxis: {
          labels: {
            style: {
              // colors: 'gray',
              fontSize: '12px'
            }
          },
          categories: labels,
        },

      }} series={series} type="bar" height={150} />

    </div>
  )
}

export default ColumnChart
