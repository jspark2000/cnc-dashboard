import Charts from '../../components/model-performance/Charts'
import Lists from '../../components/model-performance/Lists'
import TimelineChart from '../../components/common/charts/TimelineChart'
import LineChart from '../../components/common/charts/LineChart'
import LineColumnChart from '../../components/common/charts/LineColumnChart'
import axios from 'axios'
import { useEffect, useState } from 'react'
import { CNCData } from '../../utils/cncData'
import { mockdata } from './MockData'

const ModelPerformancePage = () => {
  type ValueType = {
    key: string
    value: boolean
  }

  const initialvalues = [
    // { key: "timestamp", value: true },
    { key: 'spindlerpm', value: true },
    { key: 'currentfeadrate', value: true },
    { key: 'spindleload', value: true },
    // { key: "xaxis", value: true },
    // { key: "zaaxis", value: true },
    { key: 'toolgroupid', value: true },
    { key: 'toollifecounter', value: true },
    { key: 'partcounter', value: false },
    { key: 'powerontime', value: false },
    // { key: "operationtime", value: false },
    // { key: "cuttime", value: false },
    // { key: "cycletime", value: false },
    { key: 'alarm0', value: false },
    { key: 'alarm1', value: false },
    { key: 'alarm2', value: false },
    { key: 'alarm3', value: false },
    { key: 'alarm4', value: false },
    { key: 'alarm5', value: false },
    { key: 'alarm6', value: false },
    { key: 'alarm7', value: false },
    { key: 'alarm8', value: false },
    { key: 'alarm9', value: false },
    { key: 'alarm10', value: false },
    { key: 'alarm11', value: false },
    { key: 'alarm12', value: false },
    { key: 'alarm13', value: false },
    { key: 'alarm14', value: false },
    { key: 'axesno', value: false },
    { key: 'onoff', value: false },
    { key: 'ncprogno', value: false },
    { key: 'ncmainprogno', value: false },
    { key: 'spindleno', value: false },
    { key: 'operationmode', value: false },
    { key: 'servocurrent1', value: false },
    { key: 'servocurrent2', value: false },
    { key: 'servocurrent3', value: false },
    { key: 'servocurrent4', value: false },
    { key: 'servocurrent5', value: false },
    { key: 'servomotorspeed1', value: false },
    { key: 'servomotorspeed2', value: false },
    { key: 'servomotorspeed3', value: false },
    { key: 'servomotorspeed4', value: false },
    { key: 'servomotorspeed5', value: false },
    { key: 'temp', value: false },
    { key: 'gcodegroupno', value: false },
    { key: 'gcodeflag', value: false }
    // { key: "gcode", value: false },
  ]

  const realTimeInitialValues = [
    { key: 'timestamp', value: true },
    { key: 'spindlerpm', value: true },
    { key: 'servocurrent1', value: false },
    { key: 'servocurrent2', value: false },
    { key: 'servocurrent3', value: false },
    { key: 'servocurrent4', value: false },
    { key: 'servocurrent5', value: false },
    { key: 'servomotorspeed1', value: false },
    { key: 'servomotorspeed2', value: false },
    { key: 'servomotorspeed3', value: false },
    { key: 'servomotorspeed4', value: false },
    { key: 'servomotorspeed5', value: false },
    { key: 'temp', value: false }
  ]
  const formatDateToLocaleString = (date: Date): string => {
    const month = ('0' + (date.getUTCMonth() + 1)).slice(-2) // getUTCMonth is zero-based
    const day = ('0' + date.getUTCDate()).slice(-2)
    const hours = ('0' + date.getUTCHours()).slice(-2)
    const minutes = ('0' + date.getUTCMinutes()).slice(-2)
    const seconds = ('0' + date.getUTCSeconds()).slice(-2)

    return `${month}-${day} ${hours}:${minutes}:${seconds}`
  }

  const [data, setData] = useState<CNCData[]>([])

  const [toolingData, setToolingData] = useState<{ x: string; y: number }[]>([])

  const [toolingSeries, setToolingSeries] = useState<any[]>([])

  const [limitData, setLimitData] = useState<{ x: string; y: number }[]>([])

  const [limitSeries, setLimitSeries] = useState<any[]>([])

  const [series, setSeries] = useState<any[]>([])

  const [categories, setCategories] = useState<string[]>([])

  useEffect(() => {
    // axios.get('http://localhost:4000/data').then((res) => {
    //   console.log(res.data)
    //   setData(res.data)
    //   // dispatch(updateData(res.data));
    // })

    setData(mockdata)
  }, [])

  useEffect(() => {
    if (data.length === 0) return

    let timestamp = data[0].timestamp
    let toolingData: { x: string; y: number }[] = []
    let currentCode = 'G00'

    let startTime = ''
    let endTime = ''

    let limit = 100

    let lineSeriesData: { x: string; y: number }[] = []
    let categories: string[] = []

    data.forEach((item, index) => {
      // console.log(formatDateToLocaleString(new Date(item.timestamp)))
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
      // currentCode = 'G01'
    })

    // setToolingData(toolingData)
    // setLimitData(lineSeriesData)
    setCategories(categories)
    // setToolingSeries([
    //   // {
    //   //   name: 'Line Series',
    //   //   type: 'line',
    //   //   data: lineSeriesData
    //   // },
    //   {
    //     name: 'Timeline Series',
    //     type: 'rangeBar',
    //     data: toolingData
    //   }
    // ])
    // lineSeriesData.pop();

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
          {/* <div>
              {
                limitSeries.length > 0 && (
                  <LineChart
                    series={limitSeries}
                    categories={limitData.map(item => item.x)}
                    height={250}
                    // min={new Date(limitData[0].x).getTime()}
                    // max={new Date(limitData[limitData.length - 1].x).getTime()}
                  />
                )
              }
              </div> */}
        </div>
      </div>
      <Lists />
    </div>
  )
}

export default ModelPerformancePage
