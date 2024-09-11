import { ChartBarIcon } from '@heroicons/react/24/outline'
import LineChart from '../../../components/common/charts/LineChart'

const FeaturePage: React.FC = () => {
  return (
    <div className="grid h-full max-h-screen w-full grid-cols-3 gap-2 py-5">
      <div className="col-span-3 ml-2 flex items-center pb-4">
        <ChartBarIcon className="h-8 w-8 pr-1.5 text-zinc-600" />
        <h2 className="text-xl font-bold">Vibraion Charts</h2>
      </div>
      <div className="flex flex-col">
        <p className="ml-4 rounded-md bg-zinc-600 px-4 py-1 text-base font-bold text-zinc-50">
          RMS
        </p>
        <LineChart
          height={200}
          categories={[]}
          series={[
            { name: 'x', data: [1, 2, 3, 4, 5] },
            { name: 'y', data: [3, 2, 3, 3, 4] },
            { name: 'z', data: [1, 5, 1, 1, 1] }
          ]}
        />
      </div>
      <div className="flex flex-col">
        <p className="ml-4 rounded-md bg-zinc-600 px-4 py-1 text-base font-bold text-zinc-50">
          MAX
        </p>
        <LineChart
          height={200}
          categories={[]}
          series={[
            { name: 'x', data: [1, 2, 3, 4, 5] },
            { name: 'y', data: [3, 2, 3, 3, 4] },
            { name: 'z', data: [1, 5, 1, 1, 1] }
          ]}
        />
      </div>
      <div className="flex flex-col">
        <p className="ml-4 rounded-md bg-zinc-600 px-4 py-1 text-base font-bold text-zinc-50">
          STD
        </p>
        <LineChart
          height={200}
          categories={[]}
          series={[
            { name: 'x', data: [1, 2, 3, 4, 5] },
            { name: 'y', data: [3, 2, 3, 3, 4] },
            { name: 'z', data: [1, 5, 1, 1, 1] }
          ]}
        />
      </div>
      <div className="flex flex-col">
        <p className="ml-4 rounded-md bg-zinc-600 px-4 py-1 text-base font-bold text-zinc-50">
          IMPACT FACTOR
        </p>
        <LineChart
          height={200}
          categories={[]}
          series={[
            { name: 'x', data: [1, 2, 3, 4, 5] },
            { name: 'y', data: [3, 2, 3, 3, 4] },
            { name: 'z', data: [1, 5, 1, 1, 1] }
          ]}
        />
      </div>
      <div className="flex flex-col">
        <p className="ml-4 rounded-md bg-zinc-600 px-4 py-1 text-base font-bold text-zinc-50">
          CREST FACTOR
        </p>
        <LineChart
          height={200}
          categories={[]}
          series={[
            { name: 'x', data: [1, 2, 3, 4, 5] },
            { name: 'y', data: [3, 2, 3, 3, 4] },
            { name: 'z', data: [1, 5, 1, 1, 1] }
          ]}
        />
      </div>
      <div className="flex flex-col">
        <p className="ml-4 rounded-md bg-zinc-600 px-4 py-1 text-base font-bold text-zinc-50">
          MEAN POWER SPECTRUM
        </p>
        <LineChart
          height={200}
          categories={[]}
          series={[
            { name: 'x', data: [1, 2, 3, 4, 5] },
            { name: 'y', data: [3, 2, 3, 3, 4] },
            { name: 'z', data: [1, 5, 1, 1, 1] }
          ]}
        />
      </div>
      <div className="col-span-3 ml-2 flex items-center pb-4">
        <ChartBarIcon className="h-8 w-8 pr-1.5 text-zinc-600" />
        <h2 className="text-xl font-bold">Current Charts</h2>
      </div>
      <div className="flex flex-col">
        <p className="ml-4 rounded-md bg-zinc-600 px-4 py-1 text-base font-bold text-zinc-50">
          RMS(Power Factor)
        </p>
        <LineChart
          height={200}
          categories={[]}
          series={[
            { name: 'phase #1', data: [1, 2, 3, 4, 5] },
            { name: 'phase #2', data: [3, 2, 3, 3, 4] },
            { name: 'phase #3', data: [1, 5, 1, 1, 1] }
          ]}
        />
      </div>
      <div className="flex flex-col">
        <p className="ml-4 rounded-md bg-zinc-600 px-4 py-1 text-base font-bold text-zinc-50">
          RMS(Current)
        </p>
        <LineChart
          height={200}
          categories={[]}
          series={[
            { name: 'phase #1', data: [1, 2, 3, 4, 5] },
            { name: 'phase #2', data: [3, 2, 3, 3, 4] },
            { name: 'phase #3', data: [1, 5, 1, 1, 1] }
          ]}
        />
      </div>
      <div className="flex flex-col">
        <p className="ml-4 rounded-md bg-zinc-600 px-4 py-1 text-base font-bold text-zinc-50">
          RMS(Voltage)
        </p>
        <LineChart
          height={200}
          categories={[]}
          series={[
            { name: 'phase #1', data: [1, 2, 3, 4, 5] },
            { name: 'phase #2', data: [3, 2, 3, 3, 4] },
            { name: 'phase #3', data: [1, 5, 1, 1, 1] }
          ]}
        />
      </div>
    </div>
  )
}

export default FeaturePage
