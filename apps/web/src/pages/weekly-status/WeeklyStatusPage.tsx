import StackedColumnChart from '../../components/charts/column_chart/StackedColumnChart'
import PieChart from '../../components/charts/pie_chart/PieChart'

const WeeklyStatusPage: React.FC = () => {
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
              <div className="col-span-11">
                <StackedColumnChart />
              </div>
            </div>
            <div className="flex bg-white">
              <div className="col-span-1 flex flex-col items-center justify-center bg-gray-800 px-2 text-sm font-semibold text-white">
                <span className="block">완</span>
                <span className="block">전</span>
                <span className="block">가</span>
                <span className="block">공</span>
              </div>
              <div className="col-span-11">
                <StackedColumnChart />
              </div>
            </div>
          </div>
        </div>
        <div className="col-span-1">
          <div className="flex justify-between bg-gray-600 px-2 py-1 text-center text-sm font-bold text-white">
            <p>WEEKLY PRODUCT STATUS</p>
            <p>(단위: 개수)</p>
          </div>
          <div className="grid grid-cols-1 gap-1">
            <PieChart />
            <PieChart />
          </div>
        </div>
        <div className="col-span-1">
          <div className="flex justify-between bg-gray-600 px-2 py-1 text-center text-sm font-bold text-white">
            <p>WEEKLY OPERATION TIME</p>
            <p>(단위: 시간)</p>
          </div>
          <div className="grid grid-cols-1 gap-1">
            <PieChart />
            <PieChart />
          </div>
        </div>
      </div>
    </div>
  )
}

export default WeeklyStatusPage
