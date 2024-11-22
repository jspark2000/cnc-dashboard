import { fetcher, getChartColor } from '@/libs/utils'
import { ChartRange, type ChartReturnType } from '@/types'
import moment from 'moment'
import { useEffect, useState } from 'react'
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts'

export default function HealthCheckingPage() {
  const [range, setRange] = useState<ChartRange>(ChartRange.FIFTEEN_MINUTES)
  const [avgData, setAvgData] = useState<ChartReturnType>()

  useEffect(() => {
    const fetchAvgData = async () => {
      const response = await fetcher
        .get<ChartReturnType>(`/ht/avg-packet-size?time_range=${range}`)
        .then((result) => result.data)

      setAvgData(response)
    }

    fetchAvgData()
  }, [range])

  return (
    <div className="grid min-h-screen w-full grid-cols-12 px-5">
      <div className="col-span-12 mb-4 flex justify-between">
        <h1 className="text-2xl font-bold">System Metrics</h1>
      </div>

      {avgData && avgData.data && (
        <div className="col-span-8">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={avgData.data}
              margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis
                dataKey="timestamp"
                tickFormatter={(timestamp) =>
                  moment(timestamp).format('MM/DD HH:mm:ss')
                }
                fontSize="12px"
              />
              <YAxis
                label={{
                  value: 'Bytes',
                  angle: -90,
                  position: 'insideLeft'
                }}
                fontSize="12px"
              />
              <Tooltip
                labelFormatter={(label) =>
                  moment(label).format('MM/DD HH:mm:ss')
                }
              />
              <Legend />
              {avgData.topics.map((topic, index) => {
                return (
                  <Line
                    type="linear"
                    dataKey={topic}
                    name={topic}
                    stroke={getChartColor(index)}
                    dot={false}
                  />
                )
              })}
            </LineChart>
          </ResponsiveContainer>
        </div>
      )}
    </div>
  )
}
