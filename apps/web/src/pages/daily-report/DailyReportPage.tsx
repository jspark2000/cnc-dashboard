import SimpleColumnChart from '../../components/charts/column_chart/SimpleColumnChart'
import BasicLineChart from '../../components/charts/line_chart/BasicLineChart'
import PieChart from '../../components/charts/pie_chart/PieChart'
import SemiCircleGauge from '../../components/charts/radialbar_chart/SemiCircleGauge'
import ItemInfoTable from '../../components/table/ItemInfoTable'
import MachineInfoTable from '../../components/table/MachineInfoTable'

const DailyReportPage: React.FC = () => {
  return (
    <div className="grid w-full grid-cols-12 gap-3">
      <div className="col-span-12">
        <h1 className="text-2xl font-bold">데일리 리포트</h1>
      </div>
      <div className="col-span-12">
        <MachineInfoTable />
      </div>
      <div className="col-span-12 grid grid-cols-6 gap-1">
        <div className="col-span-1">
          <div className="bg-gray-950 py-1 text-center font-bold text-white">
            <h2>점유율</h2>
          </div>
          <PieChart />
        </div>
        <div className="col-span-1">
          <div className="bg-gray-950 py-1 text-center font-bold text-white">
            <h2>장비 가동률</h2>
          </div>
          <PieChart />
        </div>
        <div className="col-span-1">
          <div className="bg-gray-950 py-1 text-center font-bold text-white">
            <h2>가공 가동률</h2>
          </div>
          <PieChart />
        </div>
        <div className="col-span-3 flex flex-col">
          <div className="col-span-3">
            <div className="bg-gray-950 py-1 text-center font-bold text-white">
              <h2>장비 종합 효율: 73.0%</h2>
            </div>
          </div>
          <div className="grid grid-cols-3">
            <div>
              <SemiCircleGauge percentage={92.8} />
              <div className="bg-gray-800 py-1 text-center font-bold text-white">
                <h2 className="text-sm">가용성 (Availability)</h2>
              </div>
              <div>
                <SimpleColumnChart
                  data={[1118.7, 1205.0]}
                  categories={['가공시간', '계획가공시간']}
                  title={'(min)'}
                />
              </div>
            </div>
            <div>
              <SemiCircleGauge color={'#84cc16'} percentage={81.8} />
              <div className="bg-gray-800 py-1 text-center font-bold text-white">
                <h2 className="text-sm">성능 (Performance)</h2>
              </div>
              <div>
                <SimpleColumnChart
                  data={[128, 156]}
                  categories={['생산수량', '계획수량']}
                  title={'(EA)'}
                />
              </div>
            </div>
            <div>
              <SemiCircleGauge color={'#facc15'} percentage={96.1} />
              <div className="bg-gray-800 py-1 text-center font-bold text-white">
                <h2 className="text-sm">품질 (Quality)</h2>
              </div>
              <div>
                <SimpleColumnChart
                  data={[123, 5]}
                  categories={['양품', '불량품']}
                  title={'(EA)'}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="col-span-12 flex">
          <div className="col-span-1 flex flex-col items-center justify-center bg-gray-950 px-2 text-sm font-semibold text-white">
            <span className="block">가</span>
            <span className="block">공</span>
            <span className="block">부</span>
            <span className="block">하</span>
          </div>
        <BasicLineChart />
      </div>
      <div className='col-span-12'>
        <ItemInfoTable />
      </div>
    </div>
  )
}

export default DailyReportPage
