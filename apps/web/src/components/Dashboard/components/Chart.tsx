import ReactApexChart, { Props as ChartProps } from 'react-apexcharts'
import React, { useEffect, useState, useMemo } from 'react'
import io from 'socket.io-client'
import axios from 'axios'
import { CNCData } from '../../../utils/cncData'

// import { boardColorSelectionsMap, chartColorArray } from '@kinderlabs-pos/shared-data-type';
import { Box, Checkbox, Stack, Typography } from '@mui/material'

import styled from 'styled-components'
import { formatTime } from '../../../utils/formatTime'

const Chart = ({
  data,
  series
}: {
  data: CNCData[]
  series: ChartProps['series']
}) => {
  return (
    <Container>
      {/* <CheckboxGroup />? */}
      {/* <Stack direction={'row'}> */}
      <ChartContainer>
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
                colors: ['#f3f3f3', 'transparent'], // takes an array which will be repeated on columns
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
      </ChartContainer>
    </Container>
  )
}

export default Chart

const Container = styled.div`
  display: flex;
`

const ChartContainer = styled.div`
  width: 80%;
  height: 700px;
  // margin: 0 auto;
`

const CheckboxContainer = styled.div`
  width: 20%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 20px;
`
