import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import CncPage from './cnc/CncPage'
import queryString from 'query-string'
import VibrationAndCurrentPage from './vibration&current/VibrationAndCurrentPage'
import SubNavigation from './SubNavigation'

const MornitoringPage: React.FC = () => {
  const navigate = useNavigate()
  const query = queryString.parse(location.search)

  useEffect(() => {
    if (!query.view) {
      navigate('/mornitoring?view=cnc')
    }
  }, [])

  const routePages = () => {
    if (query.view === 'vibration-and-current') {
      return <VibrationAndCurrentPage />
    } else {
      return <CncPage />
    }
  }

  return (
    <div className="flex flex-col">
      <div>
        <SubNavigation />
      </div>
      <section className="flex flex-col">{routePages()}</section>
    </div>
  )
}

export default MornitoringPage
