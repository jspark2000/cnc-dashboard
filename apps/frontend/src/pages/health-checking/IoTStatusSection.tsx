import type { RootState } from '@/store'
import { useSelector } from 'react-redux'

export default function IoTStatusSection() {
  const iot = useSelector((state: RootState) => state.systemMetric)

  const bytesToGB = (bytes: number) => {
    return (bytes / 1024 / 1024 / 1024).toFixed(2)
  }

  return (
    <div className="grid grid-cols-4 gap-x-3 gap-y-5">
      <div className="col-span-4">
        <div className="pb-2 text-2xl font-bold">기본 정보</div>
        <div className="w-full max-w-lg rounded-md border border-zinc-400/30 bg-white p-5 shadow-sm">
          <h2 className="pb-5 text-lg font-semibold">전체</h2>
          <div className="flex justify-between">
            <span className="text-gray-600">데이터 기준 시각:</span>
            <span>{iot.time}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">시스템 부팅 시각:</span>
            <span>{new Date(iot.cpu.boot_time * 1000).toLocaleString()}</span>
          </div>
        </div>
      </div>

      <div className="flex flex-col space-y-2">
        <div className="text-2xl font-bold">CPU</div>
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
      </div>

      <div className="flex flex-col space-y-2">
        <div className="text-2xl font-bold">저장장치</div>
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
      </div>

      <div className="flex flex-col space-y-2">
        <div className="text-2xl font-bold">네트워크</div>
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

      <div className="flex flex-col space-y-2">
        <div className="text-2xl font-bold">메모리</div>
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
      </div>
    </div>
  )
}
