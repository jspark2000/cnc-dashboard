import Dashboard from '@/components/Dashboard/Dashboard'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import DefaultLayout from '@/layouts/DefaultLayout'
import MonitoringPage from '@/pages/monitoring/MonitoringPage'
import DailyStatusPage from '@/pages/daily-status/DailyStatusPage'
import DailyReportPage from '@/pages/daily-report/DailyReportPage'
import WeeklyStatusPage from '@/pages/weekly-status/WeeklyStatusPage'

function App() {
  return (
    <div className="App" id="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<DefaultLayout />}>
            <Route index element={<MonitoringPage />} />
            <Route path="/daily-status" element={<DailyStatusPage />} />
            <Route path="/daily-report" element={<DailyReportPage />} />
            <Route path="/weekly-status" element={<WeeklyStatusPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
      <Dashboard />
    </div>
  )
}

export default App
