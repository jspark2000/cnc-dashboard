import { Cog6ToothIcon } from '@heroicons/react/24/outline'
import { Link, useLocation } from 'react-router-dom'

const Sidebar: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const location = useLocation()

  const navigation = [
    { name: '모니터링', href: '/' },
    { name: '일간현황', href: '/daily-status' },
    { name: '주간현황', href: '/weekly-status' },
    { name: '데일리리포트', href: '/daily-report' }
  ]

  const classNames = (...classes: string[]) => {
    return classes.filter(Boolean).join(' ')
  }

  return (
    <>
      <div>
        <div className="fixed inset-y-0 z-50 flex w-32 flex-col">
          <div className="flex grow flex-col gap-y-5 overflow-y-auto border-r border-gray-200 bg-white px-6 pb-4">
            <div className="flex h-16 shrink-0 items-center">
              <img
                className="h-8 w-auto"
                src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
                alt="CNC Dashboard"
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
        <div className="pl-32">
          <main>
            <div className="min-h-screen w-full overflow-auto bg-gray-50 p-4">
              {children}
            </div>
          </main>
        </div>
      </div>
    </>
  )
}

export default Sidebar
