import React from 'react'
import Plot from 'react-plotly.js'

interface STFTSpectogramProps {
  spectrogramData: { t: number[]; f: number[]; Zxx: number[][] }
}

const STFTSpectogram: React.FC<STFTSpectogramProps> = ({ spectrogramData }) => {
  return (
    <Plot
      data={[
        {
          x: spectrogramData.f,
          y: spectrogramData.t,
          z: spectrogramData.Zxx.map((row) =>
            row.map((value) => Math.abs(value))
          ),
          type: 'heatmap',
          colorscale: 'Viridis'
        }
      ]}
      layout={{
        autosize: true,
        margin: { l: 50, r: 10, b: 50, t: 50, pad: 0 },
        title: {
          text: 'STFT Spectrogram',
          x: 0.5,
          y: 0.97,
          xanchor: 'center',
          yanchor: 'top'
        },
        xaxis: { title: 'Frequency (Hz)' },
        yaxis: { title: 'Time (s)' }
      }}
      config={{
        displayModeBar: false
      }}
      style={{ width: '100%', height: '100%' }}
    />
  )
}

export default STFTSpectogram
