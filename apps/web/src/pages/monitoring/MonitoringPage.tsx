import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import CncPage from './cnc/CncPage'
import queryString from 'query-string'
import FFTAndSTFTPage from './fft&stft/FFTAndSTFTPage'
import SubNavigation from './SubNavigation'
import FeaturePage from './features/FeaturePage'

const MornitoringPage: React.FC = () => {
  const navigate = useNavigate()
  const query = queryString.parse(location.search)

  useEffect(() => {
    if (!query.view) {
      navigate('/mornitoring?view=cnc')
    }
  }, [])

  const renderTab = () => {
    switch (query.view) {
      case 'fft-stft':
        return <FFTAndSTFTPage />
      case 'features':
        return <FeaturePage />
      default:
        return <CncPage />
    }
  }

  return (
    <div className="flex flex-col">
      <div>
        <SubNavigation />
      </div>
      <section className="flex flex-col">{renderTab()}</section>
    </div>
  )
}

export default MornitoringPage
