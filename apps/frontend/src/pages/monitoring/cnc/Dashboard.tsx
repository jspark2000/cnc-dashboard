import { cn } from '@/libs/utils'
import type { RootState } from '@/store'
import { InformationCircleIcon } from '@heroicons/react/24/outline'
import { DatabaseIcon } from 'lucide-react'
import { useSelector } from 'react-redux'

const Dashboard = () => {
  const cncData = useSelector((root: RootState) => root.cncData)

  return (
    <div className="grid grid-cols-12 gap-3 px-4 py-5">
      <div className="col-span-4 rounded-md border border-zinc-400/30 bg-white p-5 shadow-sm">
        <h2 className="mb-2 flex items-center text-lg font-semibold">
          <span>
            <InformationCircleIcon className="mr-2 h-6 w-6" />
          </span>{' '}
          기본 정보
        </h2>
        <p>id: {cncData.id}</p>
        <p>feed_rate_unit: {cncData.feed_rate_unit}</p>
        <p>feed_rate: {cncData.feed_rate}</p>
        <p>speed: {cncData.speed}</p>
        <p>마지막 업데이트: {new Date(cncData.timestamp).toLocaleString()}</p>
      </div>
      <div className="col-span-4 rounded-md border border-zinc-400/30 bg-white p-5 shadow-sm">
        <h2 className="mb-2 flex items-center text-lg font-semibold">
          <span>
            <DatabaseIcon className="mr-2 h-6 w-6" />
          </span>{' '}
          Modal Data
        </h2>
        <div className="grid grid-cols-2">
          <div className="mb-1 grid grid-cols-2 text-sm font-bold text-zinc-400">
            <p>code</p>
            <p>commanded</p>
          </div>
          <div className="mb-1 grid grid-cols-2 text-sm font-bold text-zinc-400">
            <p>code</p>
            <p>commanded</p>
          </div>
          {cncData.modal_data.map((item, index) => {
            return (
              <div
                className={
                  item.commanded
                    ? 'grid grid-cols-2 text-sm font-semibold text-green-500'
                    : 'grid grid-cols-2 text-sm'
                }
                key={index}
              >
                <p>{item.code}</p>
                <p>{item.commanded ? 'true' : 'false'}</p>
              </div>
            )
          })}
        </div>
      </div>
      <div className="col-span-4 rounded-md border border-zinc-400/30 bg-white p-5 shadow-sm">
        <h2 className="mb-2 flex items-center text-lg font-semibold">
          <span>
            <DatabaseIcon className="mr-2 h-6 w-6" />
          </span>{' '}
          One Shot Data
        </h2>
        <div className="mb-1 flex space-x-10 text-sm font-bold text-zinc-400">
          <p>code</p>
          <p>commanded</p>
        </div>
        {cncData.one_shot_data.map((item, index) => {
          return (
            <div
              className={
                item.commanded
                  ? 'flex space-x-10 text-sm font-semibold text-green-500'
                  : 'flex space-x-10 text-sm'
              }
              key={index}
            >
              <p>{item.code}</p>
              <p>{item.commanded ? 'true' : 'false'}</p>
            </div>
          )
        })}
      </div>
      <div className="col-span-4 rounded-md border border-zinc-400/30 bg-white p-5 shadow-sm">
        <h2 className="mb-2 flex items-center text-lg font-semibold">
          <span>
            <DatabaseIcon className="mr-2 h-6 w-6" />
          </span>{' '}
          Modal G-Code
        </h2>
        <div className="grid grid-cols-2">
          <div className="mb-1 grid grid-cols-3 text-sm font-bold text-zinc-400">
            <p>group</p>
            <p>flag</p>
            <p>code</p>
          </div>
          <div className="mb-1 grid grid-cols-3 text-sm font-bold text-zinc-400">
            <p>group</p>
            <p>flag</p>
            <p>code</p>
          </div>
          {cncData.modal_gcode.map((item, index) => {
            return (
              <div
                className={
                  item.flag !== '0'
                    ? 'grid grid-cols-3 text-sm font-semibold text-green-500'
                    : 'grid grid-cols-3 text-sm'
                }
                key={index}
              >
                <p>{item.group}</p>
                <p>{item.flag}</p>
                <p>{item.code}</p>
              </div>
            )
          })}
        </div>
      </div>
      <div className="col-span-5 rounded-md border border-zinc-400/30 bg-white p-5 shadow-sm">
        <h2 className="mb-2 flex items-center text-lg font-semibold">
          <span>
            <DatabaseIcon className="mr-2 h-6 w-6" />
          </span>{' '}
          Others
        </h2>
        <div className="mb-1 grid grid-cols-6 text-sm font-bold text-zinc-400">
          <p>type</p>
          <p>aux</p>
          <p>inputs</p>
          <p>negative</p>
          <p>decimal</p>
          <p>commanded</p>
        </div>
        {cncData.other_data.map((item, index) => {
          return (
            <div
              className={
                item.commanded
                  ? 'grid grid-cols-6 text-sm font-semibold text-green-500'
                  : 'grid grid-cols-6 text-sm'
              }
              key={index}
            >
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
