import Plot from 'react-plotly.js'

interface FFTData {
  x: number[]
  y: number[]
  z: number[]
  colors: string[]
}

interface FFT2DComponentProps {
  data: FFTData[]
}

const FFT2DComponent: React.FC<FFT2DComponentProps> = ({ data }) => {
  const lastSegment = data[data.length - 1]
  return (
    <Plot
      data={[
        {
          x: lastSegment.y,
          y: lastSegment.z,
          type: 'scatter',
          mode: 'lines',
          line: { color: lastSegment.colors, width: 2 }
        }
      ]}
      layout={{
        autosize: true,
        margin: { l: 40, r: 10, b: 30, t: 10, pad: 0 },
        title: {
          text: 'FFT 2D',
          x: 0.5,
          y: 0.95,
          xanchor: 'center',
          yanchor: 'top'
        },
        xaxis: { title: 'Frequency (Hz)' },
        yaxis: { title: 'Magnitude' }
      }}
      config={{
        displayModeBar: false
      }}
      style={{ width: '100%', height: '100%' }}
    />
  )
}

export default FFT2DComponent
