import Charts from './Charts'
import Lists from './Lists'
import LineColumnChart from '@/components/common/charts/LineColumnChart'
import { useEffect, useState } from 'react'
import { mockdata } from './MockData'
import type { CNCData } from '@/types'

const ModelPerformancePage = () => {
  const formatDateToLocaleString = (date: Date): string => {
    const month = ('0' + (date.getUTCMonth() + 1)).slice(-2)
    const day = ('0' + date.getUTCDate()).slice(-2)
    const hours = ('0' + date.getUTCHours()).slice(-2)
    const minutes = ('0' + date.getUTCMinutes()).slice(-2)
    const seconds = ('0' + date.getUTCSeconds()).slice(-2)

    return `${month}-${day} ${hours}:${minutes}:${seconds}`
  }

  const [data, setData] = useState<CNCData[]>([])

  const [series, setSeries] = useState<any[]>([])

  const [categories, setCategories] = useState<string[]>([])

  useEffect(() => {
    setData(mockdata)
  }, [])

  useEffect(() => {
    if (data.length === 0) return

    let toolingData: { x: string; y: number }[] = []

    let lineSeriesData: { x: string; y: number }[] = []
    let categories: string[] = []

    data.forEach((item, index) => {
      if (item.gcode === 'G00') {
        lineSeriesData.push({
          x: formatDateToLocaleString(new Date(item.timestamp)),
          y: item.toollifecounter || 0
        })

        toolingData.push({
          x: formatDateToLocaleString(new Date(item.timestamp)),
          y: 1
        })
      }

      if (item.gcode === 'G01') {
        lineSeriesData.push({
          x: formatDateToLocaleString(new Date(item.timestamp)),
          y: item.toollifecounter || 0
        })
        toolingData.push({
          x: formatDateToLocaleString(new Date(item.timestamp)),
          y: 0
        })
      }
      categories.push(formatDateToLocaleString(new Date(item.timestamp)))
    })

    setCategories(categories)

    setSeries([
      {
        name: 'Tooling Series',
        type: 'column',
        data: toolingData
      },
      {
        name: 'Limit Series',
        type: 'line',
        data: lineSeriesData
      }
    ])
  }, [data])

  return (
    <div>
      <Charts />
      <div className="col-span-full grid grid-cols-5">
        <div className="col-span-full flex flex-col space-y-1">
          <div className="ml-6 text-lg font-semibold">전체가공</div>
          <div className="flex">
            {series.length > 0 && (
              <LineColumnChart
                series={series}
                categories={categories}
                height={250}
              />
            )}
          </div>
        </div>
      </div>
      <Lists />
    </div>
  )
}

export default ModelPerformancePage
