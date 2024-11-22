import { fetcher, getChartColor } from '@/libs/utils'
import { ChartRange, type ChartReturnType } from '@/types'
import { TriangleAlertIcon } from 'lucide-react'
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

interface Props {
  range: ChartRange
  className?: string
}

const AveragePayloadChart: React.FC<Props> = ({ range, className }) => {
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
    <div className={className}>
      {avgData ? (
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={avgData.data}
            margin={{
              top: 10,
              right: 0,
              left: 0,
              bottom: 0
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
              dataKey="timestamp"
              tickFormatter={(timestamp) =>
                moment(timestamp).format('HH:mm:ss')
              }
              fontSize="10px"
            />
            <YAxis
              label={{
                value: '평균 전송량(Bytes)',
                angle: -90,
                position: 'insideLeft',
                style: {
                  fontSize: '11px',
                  fontWeight: 800
                }
              }}
              fontSize="10px"
            />
            <Tooltip
              labelFormatter={(label) => moment(label).format('MM/DD HH:mm:ss')}
            />
            <Legend
              layout="vertical"
              verticalAlign="top"
              align="right"
              wrapperStyle={{
                paddingLeft: '10px',
                fontSize: '11px',
                maxWidth: '120px',
                overflow: 'hidden',
                textOverflow: 'ellipsis'
              }}
            />
            {avgData.topics.map((topic, index) => {
              return (
                <Line
                  isAnimationActive={false}
                  key={index}
                  type="monotone"
                  dataKey={topic}
                  name={topic}
                  stroke={getChartColor(index)}
                  dot={false}
                />
              )
            })}
          </LineChart>
        </ResponsiveContainer>
      ) : (
        <div className="flex h-full items-center justify-center space-x-2">
          <TriangleAlertIcon className="h-8 w-8 text-amber-400" />
          <h2 className="text-xl font-bold">데이터를 불러오지 못했습니다.</h2>
        </div>
      )}
    </div>
  )
}

export default AveragePayloadChart
