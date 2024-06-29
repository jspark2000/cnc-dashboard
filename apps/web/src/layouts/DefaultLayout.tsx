import { Outlet } from 'react-router-dom'
import Sidebar from '../components/Sidebar'

const DefaultLayout: React.FC = () => {
  return (
    <div className="flex min-h-screen w-full flex-col">
      <Sidebar>
        <Outlet />
      </Sidebar>
    </div>
  )
}

export default DefaultLayout
