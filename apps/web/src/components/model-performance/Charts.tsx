import axios from 'axios'
import type { AnomalyData, AnomalyRatio } from '../../types/interfaces'
import LineChart from '../common/charts/LineChart'
import PieChart from '../common/charts/PieChart'
import { useEffect, useState } from 'react'

const Charts = () => {
  const lossSeries = [
    { name: 'Th 1', data: [0, 0, 0] },
    { name: 'Th 2', data: [0.3, 0.3, 0.3] },
    { name: 'Th 3', data: [0.5, 0.5, 0.5] },
    { name: 'Th 4', data: [1.0, 1.0, 1.0] }
  ]

  const [anomalyData, setAnomalyData] = useState<AnomalyData[]>()
  const [anomalyRate, setAnomalyRate] = useState<AnomalyRatio>()
  const [anomalySeries, setAnomalySeries] = useState<{
    time: string[]
    data: number[]
  }>()

  useEffect(() => {
    const fetch = async () => {
      const result = await axios
        .get<{
          data: AnomalyData[]
          data_len: number
          anomaly_th_count: AnomalyRatio
        }>('http://127.0.0.1:4000/predict_result/anomaly')
        .then((result) => result.data)

      if (result) {
        setAnomalyData(result.data)
        setAnomalyRate(result.anomaly_th_count)
        setAnomalySeries({
          time: result.data.map((item) => item.timestamp),
          data: result.data.map((item) => item.anomaly_score)
        })
      }
    }

    fetch()
  }, [])

  return (
    <div>
      <h2></h2>
      <div className="mt-3 flex w-full items-center">
        <div className="w-3/4">
          <div className="ml-5 text-lg font-semibold text-gray-800">
            단계별 이상치 분포
          </div>
          {anomalySeries && (
            <LineChart
              height={250}
              series={[{ name: 'anomaly_score', data: anomalySeries.data }]}
              categories={anomalySeries.time}
              type="datetime"
            />
          )}
        </div>
        <div className="w-1/4">
          {anomalyRate && (
            <PieChart
              series={[anomalyRate?.lv1, anomalyRate?.lv2, anomalyRate.lv3]}
              labels={['lv1_ratio', 'lv2_ratio', 'lv3_ratio']}
              title="단계별 이상치 비중"
            />
          )}
        </div>
      </div>
    </div>
  )
}

export default Charts
