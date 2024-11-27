import type { RootState } from '@/store'
import { useSelector } from 'react-redux'

const Dashboard = () => {
  const cncData = useSelector((root: RootState) => root.cncData)

  return (
    <div className="grid grid-cols-12 gap-3 px-4 py-5">
      <div className="col-span-4 rounded-md border border-zinc-400 bg-white px-4 py-2 shadow-sm">
        <h2 className="text-lg font-semibold">기본 정보</h2>
        <p>id: {cncData.id}</p>
        <p>feed_rate_unit: {cncData.feed_rate_unit}</p>
        <p>feed_rate: {cncData.feed_rate}</p>
        <p>speed: {cncData.speed}</p>
        <p>업데이트 시각: {new Date(cncData.timestamp).toLocaleString()}</p>
      </div>
      <div className="col-span-4">
        <h2 className="text-lg font-semibold">Modal G-Code</h2>
        {cncData.modal_gcode.map((item, index) => {
          return (
            <div className="flex space-x-5" key={index}>
              <p>{item.group}</p>
              <p>{item.flag}</p>
              <p>{item.code}</p>
            </div>
          )
        })}
      </div>
      <div className="col-span-4">
        <h2 className="text-lg font-semibold">Modal Data</h2>
        {cncData.modal_data.map((item, index) => {
          return (
            <div className="flex space-x-5" key={index}>
              <p>{item.code}</p>
              <p>{item.commanded ? 'true' : 'false'}</p>
            </div>
          )
        })}
      </div>
      <div className="col-span-4">
        <h2 className="text-lg font-semibold">One Shot Data</h2>
        {cncData.one_shot_data.map((item, index) => {
          return (
            <div className="flex space-x-5" key={index}>
              <p>{item.code}</p>
              <p>{item.commanded ? 'true' : 'false'}</p>
            </div>
          )
        })}
      </div>
      <div className="col-span-4">
        <h2 className="text-lg font-semibold">One Shot Data</h2>
        {cncData.other_data.map((item, index) => {
          return (
            <div className="flex space-x-5" key={index}>
              <p>{item.type}</p>
              <p>{item.aux_data}</p>
              <p>{item.inputs}</p>
              <p>{item.is_negative ? 'true' : 'false'}</p>
              <p>{item.has_decimal ? item.decimal : '-'}</p>
              <p>{item.commanded ? 'true' : 'false'}</p>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default Dashboard
