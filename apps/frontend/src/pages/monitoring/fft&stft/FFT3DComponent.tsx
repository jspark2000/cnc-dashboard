import Plot from 'react-plotly.js'

interface FFTData {
  x: number[]
  y: number[]
  z: number[]
  colors: string[]
}

interface FFT3DComponentProps {
  data: FFTData[]
}

const FFT3DComponent: React.FC<FFT3DComponentProps> = ({ data }) => {
  return (
    <Plot
      data={data.map((segment, index) => ({
        x: segment.x,
        y: segment.y,
        z: segment.z,
        type: 'scatter3d',
        mode: 'lines',
        name: `${index + 1}`,
        line: { color: segment.colors, width: 2 }
      }))}
      layout={{
        autosize: true,
        margin: { l: 0, r: 0, b: 0, t: 0, pad: 0 },
        title: {
          text: 'FFT 3D',
          x: 0.5,
          y: 0.95,
          xanchor: 'center',
          yanchor: 'top'
        },
        showlegend: false,
        scene: {
          xaxis: { title: 'Segment' },
          yaxis: { title: 'Frequency (Hz)' },
          zaxis: { title: 'Magnitude' },
          camera: {
            eye: { x: 1.4, y: 1.8, z: 1.8 },
            up: { x: 0.1, y: 0.1, z: 1 },
            center: { x: 0, y: 0, z: 0 }
          }
        }
      }}
      config={{
        displayModeBar: false
      }}
      style={{ width: '100%', height: '100%' }}
    />
  )
}

export default FFT3DComponent
