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
    <div className="py-2 pl-4">
      <div className="flex flex-row space-x-2 font-semibold">
        <button
          className={classNames(
            query.view === 'cnc'
              ? 'rounded-md border border-zinc-400 bg-zinc-800 px-4 py-2 text-zinc-50 shadow-sm'
              : 'rounded-md border border-zinc-400 px-4 py-2 text-zinc-800 shadow-sm'
          )}
          onClick={() => {
            changeQueryString({ view: 'cnc' })
          }}
          disabled={query.view === 'cnc'}
        >
          CNC
        </button>
        <button
          className={classNames(
            query.view === 'fft-stft'
              ? 'rounded-md border border-zinc-400 bg-zinc-800 px-4 py-2 text-zinc-50 shadow-sm'
              : 'rounded-md border border-zinc-400 px-4 py-2 text-zinc-800 shadow-sm'
          )}
          onClick={() => {
            changeQueryString({ view: 'fft-stft' })
          }}
          disabled={query.view === 'fft-stft'}
        >
          FFT / STFT
        </button>
        <button
          className={classNames(
            query.view === 'features'
              ? 'rounded-md border border-zinc-400 bg-zinc-800 px-4 py-2 text-zinc-50 shadow-sm'
              : 'rounded-md border border-zinc-400 px-4 py-2 text-zinc-800 shadow-sm'
          )}
          onClick={() => {
            changeQueryString({ view: 'features' })
          }}
          disabled={query.view === 'features'}
        >
          진동 및 전류 Features
        </button>
      </div>
    </div>
  )
}

export default SubNavigation
