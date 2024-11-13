import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const RouteToMornitoring: React.FC = () => {
  const navigate = useNavigate()

  useEffect(() => {
    navigate('/mornitoring')
  }, [])

  return <></>
}

export default RouteToMornitoring
