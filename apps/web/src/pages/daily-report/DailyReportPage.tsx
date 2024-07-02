import ItemTable from '../../components/daily-report/\bItemTable'
import Charts from '../../components/daily-report/Charts'
import MachineTable from '../../components/daily-report/MachineTable'

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
