import PieChart from '../../components/common/charts/PieChart'
import ColumnChart from '../../components/common/charts/ColumnChart'

const WeeklyStatusPage: React.FC = () => {
  const totalProductionSeries = [
    {
      name: 'MACHINE A',
      data: [44, 55, 41, 67, 22, 43, 55]
    },
    {
      name: 'MACHINE B',
      data: [13, 23, 20, 8, 13, 27, 22]
    },
    {
      name: 'MACHINE C',
      data: [11, 17, 15, 15, 21, 14, 10]
    }
  ]

  const weeklyProductStatusSeries = [708.0, 65.0]
  const weeklyOperationTimeSeries = [6510.6, 797.7]

  return (
    <div className="grid w-full grid-cols-12 gap-3">
      <div className="col-span-12">
        <h1 className="text-2xl font-bold">주간현황</h1>
      </div>
      <div className="col-span-4">
        <div className="my-2 grid grid-cols-2 bg-gray-200 p-5">
          <div className="flex flex-col space-y-2">
            <h2 className="text-sm">현재 품번 / 프로그램명</h2>
            <p className="text-sm font-semibold">APH 025 MAIN / O7534</p>
          </div>
          <div className="flex flex-col space-y-2">
            <h2 className="text-sm">장비모델</h2>
            <p className="text-sm font-semibold">WIAVF500D</p>
          </div>
        </div>
      </div>
      <div className="col-span-12 grid grid-cols-5 gap-1">
        <div className="col-span-3">
          <div className="flex justify-between bg-gray-600 px-2 py-1 text-center text-sm font-bold text-white">
            <p>DAILY PRODUCT STATUS</p>
            <p>(단위: 개수)</p>
          </div>
          <div className="grid grid-cols-1 gap-1">
            <div className="flex bg-white">
              <div className="col-span-1 flex flex-col items-center justify-center bg-gray-800 px-2 text-sm font-semibold text-white">
                <span className="block">전</span>
                <span className="block">체</span>
                <span className="block">가</span>
                <span className="block">공</span>
              </div>
              <div className="flex w-full">
                <ColumnChart
                  series={totalProductionSeries}
                  labels={['월', '화', '수', '목', '금', '토', '일']}
                  isStacked={true}
                  height={350}
                />
              </div>
            </div>
            <div className="flex bg-white">
              <div className="col-span-1 flex flex-col items-center justify-center bg-gray-800 px-2 text-sm font-semibold text-white">
                <span className="block">완</span>
                <span className="block">전</span>
                <span className="block">가</span>
                <span className="block">공</span>
              </div>
              <div className="flex w-full">
                <ColumnChart
                  series={totalProductionSeries}
                  labels={['월', '화', '수', '목', '금', '토', '일']}
                  isStacked={true}
                  height={350}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="col-span-1">
          <div className="flex justify-between bg-gray-600 px-2 py-1 text-center text-sm font-bold text-white">
            <p>WEEKLY PRODUCT STATUS</p>
            <p>(단위: 개수)</p>
          </div>
          <div className="flex flex-col space-y-1">
            <div className="flex h-[365px] items-center justify-center bg-white">
              <PieChart
                series={weeklyProductStatusSeries}
                labels={['MACHINE A', 'MACHINE B']}
                height={350}
              />
            </div>
            <div className="flex h-[365px] items-center justify-center bg-white">
              <PieChart
                series={weeklyProductStatusSeries}
                labels={['MACHINE A', 'MACHINE B']}
                height={350}
              />
            </div>
          </div>
        </div>
        <div className="col-span-1">
          <div className="flex justify-between bg-gray-600 px-2 py-1 text-center text-sm font-bold text-white">
            <p>WEEKLY OPERATION TIME</p>
            <p>(단위: 시간)</p>
          </div>
          <div className="flex flex-col space-y-1">
            <div className="flex h-[365px] items-center justify-center bg-white">
              <PieChart
                series={weeklyOperationTimeSeries}
                labels={['MACHINE A', 'MACHINE B']}
                height={350}
              />
            </div>
            <div className="flex h-[365px] items-center justify-center bg-white">
              <PieChart
                series={weeklyOperationTimeSeries}
                labels={['MACHINE A', 'MACHINE B']}
                height={350}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default WeeklyStatusPage
