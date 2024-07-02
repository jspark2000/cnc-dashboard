import ColumnChart from '../common/charts/ColumnChart'
import GaugeChart from '../common/charts/GaugeChart'
import LineChart from '../common/charts/LineChart'
import PieChart from '../common/charts/PieChart'

// Function to generate a list of random integers
const generateRandomList = (
  length: number,
  minVal: number,
  maxVal: number
): number[] => {
  return Array.from(
    { length },
    () => Math.floor(Math.random() * (maxVal - minVal + 1)) + minVal
  )
}

const generateSequentialList = (maxVal: number): number[] => {
  return Array.from({ length: maxVal + 1 }, (_, index) => index)
}

const Charts = () => {
  const utilizationSeries = [100]
  const machineOccupancySeries = [35, 83]
  const occupancySeries = [66, 34]

  const availabilityGaugeSeries = [92.8]
  const performanceGaugeSeries = [81.8]
  const qualityGaugeSeries = [96.1]

  const availabilityBarSeries = [{ data: [1407.8, 1408.0] }]
  const performanceBarSeries = [{ data: [161, 161] }]
  const qualityBarSeries = [{ data: [161, 0] }]

  const loadSeries = [
    { name: '전류', data: generateRandomList(165, 0, 10) },
    { name: '부하', data: generateRandomList(165, 0, 10) }
  ]

  const loadCategories = generateSequentialList(164)

  console.log(loadSeries, loadCategories)
  return (
    <div>
      <div className="mt-3 flex h-[250px] items-center">
        <div className="flex h-full w-1/2 items-center">
          <div className="w-1/3">
            <PieChart
              series={utilizationSeries}
              labels={['점유율']}
              title="점유율"
            />
          </div>
          <div className="w-1/3">
            <PieChart
              series={machineOccupancySeries}
              labels={['가동', '비가동']}
              title="장비 가동률"
            />
          </div>
          <div className="w-1/3">
            <PieChart
              series={occupancySeries}
              labels={['가공 가동', '비가공 가동']}
              title="가공 가동률"
            />
          </div>
        </div>
        <div className="h-full w-1/2">
          <div className="flex h-1/2">
            <div className="w-1/3">
              <GaugeChart
                series={availabilityGaugeSeries}
                label="가용성 (Availability)"
              />
            </div>
            <div className="w-1/3">
              <GaugeChart
                series={performanceGaugeSeries}
                label="성능 (Performance)"
              />
            </div>
            <div className="w-1/3">
              <GaugeChart series={qualityGaugeSeries} label="품질 (Quality)" />
            </div>
          </div>
          <div className="flex h-1/2">
            <div className="w-1/3">
              <ColumnChart
                series={availabilityBarSeries}
                labels={['가공시간', '계획가공시간']}
              />
            </div>
            <div className="w-1/3">
              <ColumnChart
                series={performanceBarSeries}
                labels={['생산수량', '계획수량']}
              />
            </div>
            <div className="w-1/3">
              <ColumnChart
                series={qualityBarSeries}
                labels={['양품', '불량품']}
              />
            </div>
          </div>
        </div>
      </div>
      <div className="mt-3 w-full items-center">
        <LineChart series={loadSeries} categories={loadCategories} />
      </div>
    </div>
  )
}

export default Charts
