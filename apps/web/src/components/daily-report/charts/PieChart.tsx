import ReactApexChart, { Props as ChartProps } from 'react-apexcharts'

const PieChart = ({series, labels, title}: {series: ChartProps['series'], labels: any[], title: string}) => {

  return (
    <div className='p-4'>

    <ReactApexChart options={
      {
        chart: {
          type: 'donut',
        },
        plotOptions: {
          pie: {
            donut: {
              size: "65%",
            },
          },
        },
        title: {
          text: title,
          align: 'center',
        },
        series: series,
        labels: labels,
        legend: {
          show: true,
          position: 'bottom'
        },
      }
    } series={series} type="donut" height={250} />

    </div>
  )
}

export default PieChart
