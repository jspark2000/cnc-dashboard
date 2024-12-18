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
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import IoTStatusSection from './IoTStatusSection'

export default function HealthCheckingPage() {
  const [range, setRange] = useState<ChartRange>(ChartRange.ONE_HOUR)
  const [tab, setTab] = useState('mqtt')

  const randerTab = () => {
    switch (tab) {
      case 'mqtt':
        return (
          <>
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
          </>
        )
      case 'iot':
        return (
          <div className="basis-11/12">
            <IoTStatusSection />
          </div>
        )
      case 'kibana':
        return (
          <iframe
            src="http://192.168.30.211:5601/goto/33797ce5d31b29ef2805077a1f846114"
            height="90%"
            width="100%"
          ></iframe>
        )
    }
  }

  return (
    <div className="flex h-full w-full flex-col space-y-2 px-4 py-5">
      <div className="flex basis-1/12 items-center space-x-8">
        <h1 className="text-2xl font-bold text-zinc-800">
          시스템 상태 모니터링
        </h1>
        <Tabs value={tab} onValueChange={(value) => setTab(value)}>
          <TabsList>
            <TabsTrigger value="mqtt">MQTT 브로커</TabsTrigger>
            <TabsTrigger value="iot">IOT 기기</TabsTrigger>
            <TabsTrigger value="kibana">Kibana 대시보드</TabsTrigger>
          </TabsList>
        </Tabs>
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
      {randerTab()}
    </div>
  )
}
