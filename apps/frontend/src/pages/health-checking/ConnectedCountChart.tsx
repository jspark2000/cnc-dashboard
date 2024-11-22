import { fetcher } from '@/libs/utils'
import type { ChartRange } from '@/types'
import moment from 'moment'
import { useEffect, useState } from 'react'

interface Props {
  range: ChartRange
  className?: string
}

const ConnectedCountChart: React.FC<Props> = ({ range, className }) => {
  const [counts, setCounts] = useState<number>(0)
  const [timestamp, setTimestamp] = useState<string>()

  useEffect(() => {
    const fetchConnectedCounts = async () => {
      const response = await fetcher
        .get<{
          key: string
          data: { connectedCount: number; timestamp: string }
        }>(`/ht/connected-counts?time_range=${range}`)
        .then((result) => result.data)

      setCounts(response.data.connectedCount)
      setTimestamp(response.data.timestamp)
    }

    fetchConnectedCounts()
  }, [range])

  return (
    <div className={className}>
      <div className="flex h-full w-full flex-col justify-center text-center">
        <p className="text-sm text-zinc-400">현재 브로커 연결 수</p>
        <h2 className="text-5xl font-bold">{counts}</h2>
        <p className="pt-10 text-sm">
          {moment(timestamp).format('MM월 DD일 HH시 mm분 ss초')}
        </p>
      </div>
    </div>
  )
}

export default ConnectedCountChart
