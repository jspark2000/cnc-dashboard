import { Outlet } from "react-router-dom"
import Sidebar from "@/components/Sidebar"

const DefaultLayout: React.FC = () => {
    return (
      <div className="flex flex-col w-full min-h-screen">
        <Sidebar>
          <Outlet />
        </Sidebar>
      </div>
    )
}

export default DefaultLayout
