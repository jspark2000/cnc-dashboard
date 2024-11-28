import PieChart from '@/components/common/charts/PieChart'
import ColumnChart from '@/components/common/charts/ColumnChart'
import ModelCard from '@/components/common/card/ModelCard'

const WeeklyStatusPage: React.FC = () => {
  const totalProductionSeries = [
    {
      name: 'lv1_ratio',
      data: [89.3, 93.7, 91.4, 91.9, 93.0, 91.5, 91.0]
    },
    {
      name: 'lv2_ratio',
      data: [5.8, 5.7, 5.7, 5.7, 5.7, 5.8, 5.5]
    },
    {
      name: 'lv3_ratio',
      data: [4.9, 1.6, 2.9, 2.4, 2.3, 2.7, 3.5]
    }
  ]
  const weeklyProductStatusSeries = [91.5, 5.7, 2.8]
  const weeklyOperationTimeSeries = [6510.6, 797.7]

  return (
    <div className="flex w-full flex-col space-y-5 px-4 py-10">
      <div>
        <h1 className="text-2xl font-bold">주간현황</h1>
      </div>
      <div className="w-1/3">
        <ModelCard
          productNumber={'APH 025 MAIN'}
          programName={'O7534'}
          equipmentModel={'WIAVF500D'}
        />
      </div>
      <div className="grid grid-cols-5 gap-1">
        <div className="col-span-3">
          <div className="flex justify-between bg-gray-600 px-2 py-1 text-center text-sm font-bold text-white">
            <p>DAILY PRODUCT STATUS</p>
          </div>
          <div className="grid grid-cols-1 gap-1">
            <div className="flex bg-white">
              <div className="col-span-1 flex flex-col items-center justify-center bg-gray-800 px-2 text-sm font-semibold text-white">
                <span className="block">전</span>
                <span className="block">체</span>
                <span className="block">가</span>
                <span className="block">공</span>
              </div>
              <div className="flex h-[420px] w-full">
                <ColumnChart
                  series={totalProductionSeries}
                  labels={['월', '화', '수', '목', '금', '토', '일']}
                  isStacked={true}
                  height={'100%'}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="col-span-1">
          <div className="flex justify-between bg-gray-600 px-2 py-1 text-center text-sm font-bold text-white">
            <p>WEEKLY PRODUCT STATUS</p>
          </div>
          <div className="flex flex-col space-y-1">
            <div className="flex h-[420px] w-full bg-white">
              <PieChart
                series={weeklyProductStatusSeries}
                labels={['lv1_ratio', 'lv2_ratio', 'lv3_ratio']}
                height={'100%'}
              />
            </div>
          </div>
        </div>
        <div className="col-span-1">
          <div className="flex justify-between bg-gray-600 px-2 py-1 text-center text-sm font-bold text-white">
            <p>WEEKLY OPERATION TIME</p>
          </div>
          <div className="flex flex-col space-y-1">
            <div className="flex h-[420px] w-full bg-white">
              <PieChart
                series={weeklyOperationTimeSeries}
                labels={['MACHINE A', 'MACHINE B']}
                height={'100%'}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default WeeklyStatusPage
