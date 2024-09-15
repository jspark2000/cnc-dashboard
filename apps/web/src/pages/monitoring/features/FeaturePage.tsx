import { ChartBarIcon } from '@heroicons/react/24/outline'
import LineChart from '../../../components/common/charts/LineChart'
import { useEffect, useState } from 'react'
import axios from 'axios'
import type { GroupedPredictResult } from '../../../types/interfaces'

const FeaturePage: React.FC = () => {
  const [data, setData] = useState<GroupedPredictResult>()

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios
        .get<GroupedPredictResult>(
          'http://127.0.0.1:4000/predict_result/factors'
        )
        .then((result) => result.data)

      result.time = result.time.map(
        (time) => new Date(time).getTime() + 9 * 60 * 60 * 1000
      )

      setData(result)
    }
    fetchData()

    const intervalId = setInterval(fetchData, 60 * 1000)

    return () => clearInterval(intervalId)
  }, [])

  return (
    <div className="grid h-full max-h-screen w-full grid-cols-3 gap-2 py-5">
      <div className="col-span-3 ml-2 flex items-center pb-4">
        <ChartBarIcon className="h-8 w-8 pr-1.5 text-zinc-600" />
        <h2 className="text-xl font-bold text-orange-300">Vibraion Charts</h2>
      </div>
      {data && (
        <>
          <div className="flex flex-col">
            <p className="ml-4 bg-orange-300 px-4 py-1 text-base font-bold text-zinc-50">
              RMS
            </p>
            <LineChart
              height={200}
              categories={data.time}
              type="datetime"
              series={[
                { name: 'x', data: data.vibration.rms.x },
                { name: 'y', data: data.vibration.rms.y },
                { name: 'z', data: data.vibration.rms.z }
              ]}
            />
          </div>
          <div className="flex flex-col">
            <p className="ml-4 bg-orange-300 px-4 py-1 text-base font-bold text-zinc-50">
              MAX
            </p>
            <LineChart
              height={200}
              categories={data.time}
              type="datetime"
              series={[
                { name: 'x', data: data.vibration.max.x },
                { name: 'y', data: data.vibration.max.y },
                { name: 'z', data: data.vibration.max.z }
              ]}
            />
          </div>
          <div className="flex flex-col">
            <p className="ml-4 bg-orange-300 px-4 py-1 text-base font-bold text-zinc-50">
              STD
            </p>
            <LineChart
              height={200}
              categories={data.time}
              type="datetime"
              series={[
                { name: 'x', data: data.vibration.std.x },
                { name: 'y', data: data.vibration.std.y },
                { name: 'z', data: data.vibration.std.z }
              ]}
            />
          </div>
          <div className="flex flex-col">
            <p className="ml-4 bg-orange-300 px-4 py-1 text-base font-bold text-zinc-50">
              IMPACT FACTOR
            </p>
            <LineChart
              height={200}
              categories={data.time}
              type="datetime"
              series={[
                { name: 'x', data: data.vibration.impact_factor.x },
                { name: 'y', data: data.vibration.impact_factor.y },
                { name: 'z', data: data.vibration.impact_factor.z }
              ]}
            />
          </div>
          <div className="flex flex-col">
            <p className="ml-4 bg-orange-300 px-4 py-1 text-base font-bold text-zinc-50">
              CREST FACTOR
            </p>
            <LineChart
              height={200}
              categories={data.time}
              type="datetime"
              series={[
                { name: 'x', data: data.vibration.impact_factor.x },
                { name: 'y', data: data.vibration.impact_factor.y },
                { name: 'z', data: data.vibration.impact_factor.z }
              ]}
            />
          </div>
          <div className="flex flex-col">
            <p className="ml-4 bg-orange-300 px-4 py-1 text-base font-bold text-zinc-50">
              MEAN POWER SPECTRUM
            </p>
            <LineChart
              height={200}
              categories={data.time}
              type="datetime"
              series={[
                { name: 'x', data: data.vibration.mean_power_spectrum.x },
                { name: 'y', data: data.vibration.mean_power_spectrum.y },
                { name: 'z', data: data.vibration.mean_power_spectrum.z }
              ]}
            />
          </div>
        </>
      )}
      <div className="col-span-3 ml-2 flex items-center pb-4">
        <ChartBarIcon className="h-8 w-8 pr-1.5 text-zinc-600" />
        <h2 className="text-xl font-bold text-indigo-400">Current Charts</h2>
      </div>
      {data && (
        <>
          <div className="flex flex-col">
            <p className="ml-4 bg-indigo-400 px-4 py-1 text-base font-bold text-zinc-50">
              RMS(Power Factor)
            </p>
            <LineChart
              height={200}
              categories={data.time}
              type="datetime"
              series={[
                { name: 'phase #1', data: data.current.rms_power.p1 },
                { name: 'phase #2', data: data.current.rms_power.p2 },
                { name: 'phase #3', data: data.current.rms_power.p3 }
              ]}
            />
          </div>
          <div className="flex flex-col">
            <p className="ml-4 bg-indigo-400 px-4 py-1 text-base font-bold text-zinc-50">
              RMS(Current)
            </p>
            <LineChart
              height={200}
              categories={data.time}
              type="datetime"
              series={[
                { name: 'phase #1', data: data.current.rms_current.p1 },
                { name: 'phase #2', data: data.current.rms_current.p2 },
                { name: 'phase #3', data: data.current.rms_current.p3 }
              ]}
            />
          </div>
          <div className="flex flex-col">
            <p className="ml-4 bg-indigo-400 px-4 py-1 text-base font-bold text-zinc-50">
              RMS(Voltage)
            </p>
            <LineChart
              height={200}
              categories={data.time}
              type="datetime"
              series={[
                { name: 'phase #1', data: data.current.rms_voltage.p1 },
                { name: 'phase #2', data: data.current.rms_voltage.p2 },
                { name: 'phase #3', data: data.current.rms_voltage.p3 }
              ]}
            />
          </div>
        </>
      )}
    </div>
  )
}

export default FeaturePage
