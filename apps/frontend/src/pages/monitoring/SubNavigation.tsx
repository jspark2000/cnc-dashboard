import queryString from 'query-string'
import { useLocation, useNavigate } from 'react-router-dom'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { useEffect, useState } from 'react'

const SubNavigation: React.FC = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const query = queryString.parse(location.search)
  const [tab, setTab] = useState<string | undefined>()

  const changeQueryString = (newParams: any) => {
    const newQuery = { ...query, ...newParams }
    const newQueryString = queryString.stringify(newQuery)
    navigate(`${location.pathname}?${newQueryString}`)
  }

  useEffect(() => {
    changeQueryString({ view: tab })
  }, [tab])

  useEffect(() => {
    const query = queryString.parse(location.search)

    setTab((query?.view as string) ?? 'cnc')
  }, [])

  return (
    <div className="py-2 pl-4">
      <div className="flex basis-1/12 items-center space-x-8">
        <h1 className="text-2xl font-bold text-zinc-800">실시간 모니터링</h1>
        <Tabs value={tab} onValueChange={(value) => setTab(value)}>
          <TabsList>
            <TabsTrigger value="cnc">CNC 컨트롤러</TabsTrigger>
            <TabsTrigger value="fft-stft">FFT/STFT</TabsTrigger>
            <TabsTrigger value="features">Features</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>
    </div>
  )
}

export default SubNavigation
