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
import { useSelector } from 'react-redux'
import type { RootState } from '@/store'

export default function HealthCheckingPage() {
  const [range, setRange] = useState<ChartRange>(ChartRange.ONE_HOUR)
  const [tab, setTab] = useState('mqtt')
  const iot = useSelector((state: RootState) => state.systemMetric)

  const bytesToGB = (bytes: number) => {
    return (bytes / 1024 / 1024 / 1024).toFixed(2)
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
      {tab === 'mqtt' ? (
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
      ) : (
        <div className="flex flex-col space-y-2">
          <div>데이터 기준 시각: {iot.time}</div>
          <div>
            부팅 시간: {new Date(iot.cpu.boot_time * 1000).toLocaleString()}
          </div>

          <div className="text-2xl font-bold">CPU 정보</div>
          <div className="space-y-2.5 pb-5">
            <div className="w-full max-w-lg rounded-md border border-zinc-400/30 bg-white p-5 shadow-sm">
              <h2 className="pb-5 text-lg font-semibold">전체</h2>
              <div className="flex justify-between">
                <span className="text-gray-600">Temperature:</span>
                <span>{iot.cpu.cup_temp}°C</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Usage:</span>
                <span>{iot.cpu.cpu_percent}%</span>
              </div>
              <div className="mt-2 h-2 w-full rounded-full bg-gray-200">
                <div
                  className="h-full rounded-full bg-blue-500"
                  style={{ width: `${iot.cpu.cpu_percent}%` }}
                />
              </div>
            </div>

            <div className="w-full max-w-lg space-y-3 rounded-md border border-zinc-400/30 bg-white p-5 shadow-sm">
              <h2 className="text-lg font-semibold">코어별</h2>
              {iot.cpu.cpu_percent_per_core.map((core, index) => {
                return (
                  <div key={index}>
                    <div className="flex justify-between">
                      <span className="text-gray-600">core_#{index}:</span>
                      <span>{core}%</span>
                    </div>
                    <div className="mt-2 h-2 w-full rounded-full bg-gray-200">
                      <div
                        className="h-full rounded-full bg-blue-500"
                        style={{ width: `${core}%` }}
                      />
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          <div className="text-2xl font-bold">메모리 정보</div>
          <div className="space-y-2.5 pb-5">
            <div className="w-full max-w-lg rounded-md border border-zinc-400/30 bg-white p-5 shadow-sm">
              <h2 className="pb-5 text-lg font-semibold">전체</h2>
              <div className="flex justify-between">
                <span className="text-gray-600">Total:</span>
                <span>{bytesToGB(iot.memory.total)} GB</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Usage:</span>
                <span>{iot.memory.percent}%</span>
              </div>
              <div className="mt-2 h-2 w-full rounded-full bg-gray-200">
                <div
                  className="h-full rounded-full bg-blue-500"
                  style={{ width: `${iot.memory.percent}%` }}
                />
              </div>
            </div>
          </div>

          <div className="text-2xl font-bold">연결된 디스크 정보</div>
          <div className="space-y-2.5">
            {Object.entries(iot.disk_usage).map(([path, usage]) => (
              <div
                className="w-full max-w-lg rounded-md border border-zinc-400/30 bg-white p-5 shadow-sm"
                key={path}
              >
                <h2 className="pb-5 text-lg font-semibold">Path: {path}</h2>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Total:</span>
                    <span>{bytesToGB(usage.total)} GB</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Used:</span>
                    <span>{bytesToGB(usage.used)} GB</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Free:</span>
                    <span>{bytesToGB(usage.free)} GB</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Usage:</span>
                    <span>{usage.percent}%</span>
                  </div>

                  <div className="mt-2 h-2 w-full rounded-full bg-gray-200">
                    <div
                      className="h-full rounded-full bg-blue-500"
                      style={{ width: `${usage.percent}%` }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-2xl font-bold">네트워크 입출력</div>
          <div className="space-y-2.5 pb-5">
            <div className="w-full max-w-lg rounded-md border border-zinc-400/30 bg-white p-5 shadow-sm">
              <h2 className="pb-5 text-lg font-semibold">전체</h2>
              <div className="flex justify-between">
                <span className="text-gray-600">전송 바이트:</span>
                <span>{bytesToGB(iot.net_io.bytes_sent)} GB</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">수신 바이트:</span>
                <span>{bytesToGB(iot.net_io.bytes_recv)} GB</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">전송 패킷:</span>
                <span>{iot.net_io.packets_sent}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">수신 패킷:</span>
                <span>{iot.net_io.packets_recv}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Error IN:</span>
                <span>{iot.net_io.errin}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Error OUT:</span>
                <span>{iot.net_io.errout}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Drop IN:</span>
                <span>{iot.net_io.dropin}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Drop OUT:</span>
                <span>{iot.net_io.dropout}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">WIFI 연결강도:</span>
                <span>{iot.net_io.wifi_strength}</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
