import ModelCard from '../../components/common/card/ModelCard'
import ColumnChart from '../../components/common/charts/ColumnChart'
import LineChart from '../../components/common/charts/LineChart'
import { generateRandomList } from '../../utils/generate'

const DailyStatusPage: React.FC = () => {
  const generateSequentialList = (maxVal: number): number[] => {
    return Array.from({ length: maxVal + 1 }, (_, index) => index)
  }

  const avgAccumSeries = [
    { name: 'SPC avg', data: generateRandomList(125, 0, 100) },
    { name: 'CTOWK', data: generateRandomList(125, 0, 100) }
  ]

  const avgAccumCategories = generateSequentialList(124)

  const varAccumSeries = [
    { name: 'SPC avg', data: generateRandomList(125, 0, 40) },
    { name: 'CTOWK', data: generateRandomList(125, 0, 40) }
  ]

  const varAccumCategories = generateSequentialList(124)

  const totalProductionSeries = [
    { data: [44, 55, 41, 67, 22, 400, 55, 90, 100, 72, 12] }
  ]

  return (
    <div className="grid w-full grid-cols-12 gap-3">
      <div className="col-span-12">
        <h1 className="text-2xl font-bold">일간현황</h1>
      </div>
      <div className="col-span-4">
        <ModelCard
          productNumber={'APH 025 MAIN'}
          programName={'O7534'}
          equipmentModel={'WIAVF500D'}
        />
      </div>
      <div className="col-span-12"></div>
      <div className="col-span-12 grid grid-cols-5 bg-white">
        <div className="col-span-3 flex flex-col space-y-1">
          <div className="flex">
            <div className="flex flex-col items-center justify-center bg-gray-800 px-2 text-sm font-semibold text-white">
              <span className="block">평</span>
              <span className="block">균</span>
              <span className="block">누</span>
              <span className="block">적</span>
            </div>
            <LineChart
              series={avgAccumSeries}
              categories={avgAccumCategories}
              height={250}
            />
          </div>
          <div className="flex">
            <div className="flex flex-col items-center justify-center bg-gray-800 px-2 text-sm font-semibold text-white">
              <span className="block">분</span>
              <span className="block">산</span>
              <span className="block">누</span>
              <span className="block">적</span>
            </div>
            <LineChart
              series={varAccumSeries}
              categories={varAccumCategories}
              height={250}
            />
          </div>
        </div>
        <div className="col-span-2 flex">
          <div className="flex flex-col items-center justify-center bg-gray-800 px-2 text-sm font-semibold text-white">
            <span className="block">공</span>
            <span className="block">구</span>
            <span className="block">사</span>
            <span className="block">용</span>
            <span className="block">현</span>
            <span className="block">황</span>
          </div>
          <div className="flex h-full w-full items-center justify-center">
            <ColumnChart
              series={totalProductionSeries}
              labels={[1, 4, 5, 6, 7, 8, 9, 10, 14, 15, 19]}
              height={350}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default DailyStatusPage
