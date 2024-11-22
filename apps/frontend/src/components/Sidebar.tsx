import { Cog6ToothIcon } from '@heroicons/react/24/outline'
import { Link, useLocation } from 'react-router-dom'

const Sidebar: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const location = useLocation()

  const navigation = [
    { name: '모니터링', href: '/mornitoring' },
    { name: 'AI 이상탐지', href: '/model-performance' },
    { name: '주간현황', href: '/weekly-status' },
    { name: '데일리리포트', href: '/daily-report' },
    { name: '모델학습', href: '/model-training' },
    { name: '생산주요인자', href: '/production-factor' },
    { name: 'MQTT 상태', href: '/health-check' },
    { name: '데이터 전처리', href: '/data-preprocessing' }
  ]

  const classNames = (...classes: string[]) => {
    return classes.filter(Boolean).join(' ')
  }

  return (
    <>
      <div>
        <div className="fixed inset-y-0 z-50 flex w-40 flex-col">
          <div className="flex grow flex-col gap-y-5 overflow-y-auto border-r border-gray-200 bg-white px-6 pb-4">
            <div className="flex shrink-0 items-center pt-5">
              <img
                className="mx-auto h-10 w-auto"
                src="/logo.png"
                alt="Crois"
              />
            </div>
            <nav className="flex flex-1 flex-col">
              <ul className="flex flex-1 flex-col gap-y-7">
                <li>
                  <ul className="-mx-2 space-y-1">
                    {navigation.map((item) => (
                      <li key={item.name}>
                        <Link
                          to={item.href}
                          className={classNames(
                            location.pathname === item.href
                              ? 'bg-gray-100 text-indigo-900'
                              : 'text-gray-600 hover:bg-gray-100 hover:text-indigo-900',
                            'group flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6'
                          )}
                        >
                          {item.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </li>
                <li className="mt-auto">
                  <Link
                    to="#"
                    className="group -mx-2 flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6 text-gray-700 hover:bg-gray-50 hover:text-indigo-900"
                  >
                    <Cog6ToothIcon
                      className="h-6 w-6 shrink-0 text-gray-400 group-hover:text-indigo-900"
                      aria-hidden="true"
                    />
                    설정
                  </Link>
                </li>
              </ul>
            </nav>
          </div>
        </div>
        <div className="pl-40">
          <main
            className="grid h-full overflow-x-hidden bg-zinc-50"
            style={{ height: 'calc(100vh)' }}
          >
            {children}
          </main>
        </div>
      </div>
    </>
  )
}

export default Sidebar
