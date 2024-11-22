import { ChartRange } from '@/types'
import { useState } from 'react'
import AveragePayloadChart from './AveragePayloadChart'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'
import MessageCountChart from './MessageCountChart'
import ConnectedCountChart from './ConnectedCountChart'
import HeartBeatChart from './HeartBeatChart'

export default function HealthCheckingPage() {
  const [range, setRange] = useState<ChartRange>(ChartRange.ONE_HOUR)

  return (
    <div className="flex h-full w-full flex-col space-y-2 px-4 pb-5">
      <div className="flex basis-1/12 items-center space-x-8">
        <h1 className="text-2xl font-bold text-zinc-800">MQTT 상태 모니터링</h1>
        <div className="w-[200px]">
          <Select
            defaultValue={ChartRange.ONE_HOUR}
            onValueChange={(value) => setRange(value as ChartRange)}
          >
            <SelectTrigger>
              <SelectValue placeholder="검색범위 선택" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value={ChartRange.ONE_MINUTE}>1분</SelectItem>
              <SelectItem value={ChartRange.FIFTEEN_MINUTES}>15분</SelectItem>
              <SelectItem value={ChartRange.ONE_HOUR}>1시간</SelectItem>
              <SelectItem value={ChartRange.SIX_HOURS}>6시간</SelectItem>
              <SelectItem value={ChartRange.TWELVE_HOURS}>12시간</SelectItem>
              <SelectItem value={ChartRange.ONE_DAY}>1일</SelectItem>
              <SelectItem value={ChartRange.ONE_WEEK}>1주</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      <div className="flex basis-5/12 space-x-2">
        <ConnectedCountChart
          range={range}
          className="h-full w-full basis-1/5 rounded-md border border-zinc-400/30 bg-white pl-2 pr-2 pt-3 shadow-sm"
        />
        <MessageCountChart
          range={range}
          className="h-full w-full basis-4/5 rounded-md border border-zinc-400/30 bg-white pl-2 pr-2 pt-3 shadow-sm"
        />
      </div>
      <div className="flex basis-6/12 space-x-2">
        <AveragePayloadChart
          range={range}
          className="h-full w-full basis-2/3 rounded-md border border-zinc-400/30 bg-white pl-2 pr-2 pt-3 shadow-sm"
        />
        <HeartBeatChart
          range={range}
          className="h-full w-full basis-1/3 rounded-md border border-zinc-400/30 bg-white pl-2 pr-2 pt-3 shadow-sm"
        />
      </div>
    </div>
  )
}
