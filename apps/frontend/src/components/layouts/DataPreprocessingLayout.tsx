import type React from 'react'
import { Outlet } from 'react-router-dom'
import { SidebarProvider, SidebarTrigger } from '../ui/sidebar'
import { PreprocessingSidebar } from '../PreprocessingSidebar'

const DefaultLayout: React.FC = () => {
  return (
    <SidebarProvider
      style={{
        // @ts-ignore
        '--sidebar-width': '21rem'
      }}
    >
      <PreprocessingSidebar />
      <main className="min-h-screen w-full">
        <SidebarTrigger />
        <Outlet />
      </main>
    </SidebarProvider>
  )
}

export default DefaultLayout
