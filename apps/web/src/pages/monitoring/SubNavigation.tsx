import queryString from 'query-string'
import { useLocation, useNavigate } from 'react-router-dom'

const SubNavigation: React.FC = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const query = queryString.parse(location.search)

  const classNames = (...classes: string[]) => {
    return classes.filter(Boolean).join(' ')
  }

  const changeQueryString = (newParams: any) => {
    const newQuery = { ...query, ...newParams }
    const newQueryString = queryString.stringify(newQuery)
    navigate(`${location.pathname}?${newQueryString}`)
  }

  return (
    <div className="px-6 py-2">
      <div className="flex flex-row space-x-4 font-semibold">
        <button
          className={classNames(
            query.view === 'cnc'
              ? 'rounded-lg bg-indigo-800 p-4 text-gray-50'
              : 'rounded-lg bg-indigo-800 p-4 text-indigo-300'
          )}
          onClick={() => {
            changeQueryString({ view: 'cnc' })
          }}
          disabled={query.view === 'cnc'}
        >
          CnC
        </button>
        <button
          className={classNames(
            query.view === 'vibration-and-current'
              ? 'rounded-lg bg-indigo-800 p-4 text-gray-50'
              : 'rounded-lg bg-indigo-800 p-4 text-indigo-300'
          )}
          onClick={() => {
            changeQueryString({ view: 'vibration-and-current' })
          }}
          disabled={query.view === 'vibration-and-current'}
        >
          진동 및 전류
        </button>
      </div>
    </div>
  )
}

export default SubNavigation
