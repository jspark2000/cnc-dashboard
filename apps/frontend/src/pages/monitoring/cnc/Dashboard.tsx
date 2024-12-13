import TCPViewer from '@/components/webgl/TCPViewer'
import { calculateFinalValue } from '@/libs/utils'
import type { RootState } from '@/store'
import { InformationCircleIcon } from '@heroicons/react/24/outline'
import { Axis3DIcon, DatabaseIcon } from 'lucide-react'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

const Dashboard = () => {
  const cncData = useSelector((root: RootState) => root.cncData)
  const [position, setPosition] = useState({ x: 0, y: 0, z: 0 })

  useEffect(() => {
    const updatePosition = () => {
      try {
        const X = cncData.other_data.filter((item) => item.type === 'X')[0]
        const Y = cncData.other_data.filter((item) => item.type === 'Y')[0]
        const Z = cncData.other_data.filter((item) => item.type === 'Z')[0]

        const newPosition = { x: 0, y: 0, z: 0 }

        if (X.inputs && X.decimal) {
          newPosition.x = calculateFinalValue(X.aux_data, X.decimal) / 10
        } else {
          newPosition.x = X.aux_data / 10
        }

        if (Y.inputs && Y.decimal) {
          newPosition.y = calculateFinalValue(Y.aux_data, Y.decimal) / 10
        } else {
          newPosition.y = Y.aux_data / 10
        }

        if (Z.inputs && Z.decimal) {
          newPosition.z = calculateFinalValue(Z.aux_data, Z.decimal) / 10
        } else {
          newPosition.z = Z.aux_data / 10
        }

        setPosition(newPosition)
      } catch (error) {
        console.log(error)
      }
    }

    updatePosition()
  }, [cncData])

  return (
    <div className="grid grid-cols-12 gap-3 px-4 py-5">
      <div className="col-span-4 rounded-md border border-zinc-400/30 bg-white p-5 shadow-sm">
        <h2 className="mb-2 flex items-center text-lg font-semibold">
          <span>
            <InformationCircleIcon className="mr-2 h-6 w-6" />
          </span>{' '}
          기본 정보
        </h2>
        <div className="flex justify-between">
          <span className="text-gray-600">id</span>
          <span>{cncData.id}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-600">Feed Rate</span>
          <p>
            {cncData.feed_rate}{' '}
            <span className="text-gray-600">{cncData.feed_rate_unit}</span>
          </p>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-600">Speed</span>
          <span>{cncData.speed}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-600"># Tool</span>
          <span>
            {cncData.other_data.filter((item) => item.type === 'T').length >
            0 ? (
              <p>
                {
                  cncData.other_data.filter((item) => item.type === 'T')[0]
                    .aux_data
                }
              </p>
            ) : (
              <p>--</p>
            )}
          </span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-600"># Length Offset</span>
          <span>
            {cncData.other_data.filter((item) => item.type === 'H[M]').length >
            0 ? (
              <p>
                {
                  cncData.other_data.filter((item) => item.type === 'H[M]')[0]
                    .aux_data
                }
              </p>
            ) : (
              <p>--</p>
            )}
          </span>
        </div>
        <div className="mt-5 flex justify-between">
          <p className="text-gray-600">마지막 업데이트</p>
          <p>{new Date(cncData.timestamp).toLocaleString()}</p>
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
            <Axis3DIcon className="mr-2 h-6 w-6" />
          </span>{' '}
          Axis Visualization
        </h2>
        <div className="grid">
          <TCPViewer position={position} />
        </div>
      </div>
      <div className="col-span-3 rounded-md border border-zinc-400/30 bg-white p-5 shadow-sm">
        <h2 className="mb-2 flex items-center text-lg font-semibold">
          <span>
            <DatabaseIcon className="mr-2 h-6 w-6" />
          </span>{' '}
          Modal Data
        </h2>
        <div className="grid">
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
          Modal G-Code
        </h2>
        <div className="grid grid-cols-2">
          <div className="mb-1 grid grid-cols-3 text-sm font-bold text-zinc-400">
            <p>group</p>
            <p>flag</p>
            <p>code</p>
          </div>
          <div className="mb-1 grid grid-cols-3 text-sm font-bold text-zinc-400">
            <p>code</p>
            <p>flag</p>
            <p>group</p>
          </div>
          {cncData.modal_gcode.map((item, index) => {
            return (
              <div
                className={
                  item.flag === '128'
                    ? 'grid grid-cols-3 text-sm font-semibold text-green-500'
                    : 'grid grid-cols-3 text-sm'
                }
                key={index}
              >
                <p>{item.code}</p>
                <p>{item.flag}</p>
                <p>{item.group}</p>
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
        <div className="grid grid-cols-2">
          <div className="mb-1 grid grid-cols-3 text-sm font-bold text-zinc-400">
            <p>type</p>
            <p>value</p>
            <p>commanded</p>
          </div>
          <div className="mb-1 grid grid-cols-3 text-sm font-bold text-zinc-400">
            <p>type</p>
            <p>value</p>
            <p>commanded</p>
          </div>
          {cncData.other_data.map((item, index) => {
            return (
              <div
                className={
                  item.commanded
                    ? 'grid grid-cols-3 text-sm font-semibold text-green-500'
                    : 'grid grid-cols-3 text-sm'
                }
                key={index}
              >
                <p>{item.type}</p>
                {item.inputs && item.decimal ? (
                  <p>{calculateFinalValue(item.aux_data, item.decimal)}</p>
                ) : (
                  <p>{item.aux_data}</p>
                )}
                <p>{item.commanded ? 'true' : 'false'}</p>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default Dashboard
