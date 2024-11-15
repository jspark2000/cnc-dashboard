import ItemTable from './ItemTable'
import Charts from './Charts'
import MachineTable from './MachineTable'

const DailyReportPage: React.FC = () => {
  return (
    <div className="flex flex-col">
      <MachineTable />
      <Charts />
      <ItemTable />
    </div>
  )
}

export default DailyReportPage
