import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import CncPage from './cnc'
import queryString from 'query-string'
import FFTAndSTFTPage from './fft&stft'
import SubNavigation from './SubNavigation'
import FeaturePage from './features'

const MornitoringPage: React.FC = () => {
  const navigate = useNavigate()
  const query = queryString.parse(location.search)

  useEffect(() => {
    if (!query.view) {
      navigate('/mornitoring?view=cnc')
    }
  }, [query])

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
    <div className="flex flex-col py-5">
      <div>
        <SubNavigation />
      </div>
      <section>{renderTab()}</section>
    </div>
  )
}

export default MornitoringPage
