import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom'
import DefaultLayout from '@/components/layouts/DefaultLayout'
import MornitoringPage from '@/pages/monitoring'
import DailyStatusPage from '@/pages/daily-status'
import DailyReportPage from '@/pages/daily-report'
import WeeklyStatusPage from '@/pages/weekly-status'
import ModelPerformancePage from '@/pages/model-performance'
import ModelTrainingPage from '@/pages/model-training'
import ProductionFactorPage from '@/pages/production-factor'
import RouteToMornitoring from '@/pages'
import DataPreprocessingPage from '@/pages/data-preprocessing'
import useWebSocket from './libs/hooks'
import DataPreprocessingLayout from './components/layouts/DataPreprocessingLayout'
import { useEffect } from 'react'
import { toast } from 'sonner'
import { setCurrentFile, setFileList } from './store/setting-state.slice'
import { fetchFileList } from './libs/actions'
import type { RootState } from './store'
import { useSelector, useDispatch } from 'react-redux'

function App() {
  useWebSocket()

  const dispatch = useDispatch()
  const dataPath = useSelector((state: RootState) => state.setting.currentDIR)

  useEffect(() => {
    const fetchFileListData = async () => {
      const result = await fetchFileList(dataPath)
      dispatch(setFileList({ fileList: result.files }))
      dispatch(setCurrentFile({ currentFile: undefined }))
      toast.success('파일 목록이 업데이트 되었습니다')
    }

    fetchFileListData()
  }, [dataPath])

  const ScrollToTop = () => {
    const { pathname } = useLocation()

    useEffect(() => {
      window.scrollTo(0, 0)
    }, [pathname])

    return null
  }

  return (
    <BrowserRouter
      future={{ v7_relativeSplatPath: true, v7_startTransition: true }}
    >
      <ScrollToTop />
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
        <Route path="/data-preprocessing" element={<DataPreprocessingLayout />}>
          <Route index element={<DataPreprocessingPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
