import ItemTable from './ItemTable'
import Charts from './Charts'
import MachineTable from './MachineTable'

const DailyReportPage: React.FC = () => {
  return (
    <div className="grid grid-cols-1 px-4 py-10">
      <div>
        <MachineTable />
      </div>
      <div>
        <Charts />
      </div>
      <div>
        <ItemTable />
      </div>
    </div>
  )
}

export default DailyReportPage
