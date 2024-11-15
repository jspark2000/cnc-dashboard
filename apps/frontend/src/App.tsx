import { BrowserRouter, Route, Routes } from 'react-router-dom'
import DefaultLayout from '@/components/layouts/DefaultLayout'
import MornitoringPage from '@/pages/monitoring/MonitoringPage'
import DailyStatusPage from '@/pages/daily-status/DailyStatusPage'
import DailyReportPage from '@/pages/daily-report/DailyReportPage'
import WeeklyStatusPage from '@/pages/weekly-status/WeeklyStatusPage'
import ModelPerformancePage from '@/pages/model-performance/ModelPerformancePage'
import ModelTrainingPage from '@/pages/model-training/ModelTrainingPage'
import ProductionFactorPage from '@/pages/production-factor/ProductionFactorPage'
import RouteToMornitoring from '@/pages'
import useWebSocket from './libs/hooks'

function App() {
  useWebSocket()

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<DefaultLayout />}>
          <Route index element={<RouteToMornitoring />} />
          <Route path="/mornitoring" element={<MornitoringPage />} />
          <Route path="/daily-status" element={<DailyStatusPage />} />
          <Route path="/daily-report" element={<DailyReportPage />} />
          <Route path="/weekly-status" element={<WeeklyStatusPage />} />
          <Route path="/model-performance" element={<ModelPerformancePage />} />
          <Route path="/model-training" element={<ModelTrainingPage />} />
          <Route path="/production-factor" element={<ProductionFactorPage />} />
        </Route>
        <Route path="/data-preprocessing">
          <Route index />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
