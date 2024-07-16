import React, { useEffect, useRef } from 'react'
import Chart from 'react-apexcharts'
import { performFFT } from '../../../utils/fft'

interface FFTChartProps {
  series: number[]
  title: string
}

const FFTChart: React.FC<FFTChartProps> = ({ series, title }) => {
  const fftResult = performFFT(series)
  const labels = Array.from({ length: fftResult.length / 2 }, (_, i) => i)

  const fftMagnitude = fftResult.slice(0, fftResult.length / 2).map((val) => {
    return Math.sqrt(val[0] ** 2 + val[1] ** 2)
  })

  const data = [
    {
      name: 'Magnitude',
      data: fftMagnitude
    }
  ]

  return (
    <Chart
      options={{
        chart: {
          type: 'line',
          zoom: {
            enabled: false
          },
          toolbar: {
            show: false
          }
        },
        title: {
          text: title,
          align: 'left'
        },
        xaxis: {
          categories: labels,
          title: {
            text: 'Frequency'
          },
          tickAmount: Math.floor(fftResult.length / 10)
        },
        yaxis: {
          title: {
            text: 'Magnitude'
          },
          labels: {
            formatter(val, opts) {
              return Math.floor(val).toString()
            }
          }
        },
        stroke: {
          curve: 'straight',
          width: 2
        }
      }}
      series={data}
      type="line"
      height={400}
      width={'100%'}
    />
  )
}

export default FFTChart
