import { useEffect, useState } from 'react'
import Plot from 'react-plotly.js'
import type { CNCTempData } from '../../../../libs/utils/cncData'

const OrbitChart = ({ data }: { data: CNCTempData }) => {
  return (
    <Plot
      data={[
        {
          x: data.x.slice(0, 11),
          y: data.y.slice(0, 11),
          z: data.z.slice(0, 11),
          type: 'scatter3d',
          mode: 'lines',
          marker: { color: 'blue' }
        }
      ]}
      layout={{
        autosize: true,
        title: '3D Orbit Chart',
        scene: {
          xaxis: { title: 'X Axis', range: [-0.2, 0.2] },
          yaxis: { title: 'Y Axis', range: [-0.2, 0.2] },
          zaxis: { title: 'Z Axis', range: [-0.2, 0.2] },
          camera: {
            eye: { x: 1.4, y: 1.8, z: 1.8 },
            up: { x: 0.1, y: 0.1, z: 1 },
            center: { x: 0, y: 0, z: 0 }
          }
        }
      }}
    />
  )
}

export default OrbitChart
