import { useEffect, useState } from 'react'
import List from '../common/list/List'
import type { AnomalyData, AnomalyRatio } from '../../types/interfaces'
import axios from 'axios'

const Lists = () => {
  const [anomalyData, setAnomalyData] = useState<AnomalyData[]>()

  const anomalyHeader = [
    { name: 'Timestamp', value: 'timestamp' },
    { name: 'Severity(심각도)', value: 'severity' },
    { name: 'Anomaly Score', value: 'anomaly_score' },
    { name: 'Current Anomaly Score', value: 'current_anomaly_score' },
    { name: 'Vibration Anomaly Score', value: 'vibration_anomaly_score' },
    { name: 'Threshold', value: 'threshold' },
    { name: 'Anomaly', value: 'is_anomaly' }
  ]

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
        console.log(`fetch ${result.data_len} rows`)

        const anomalyRows = result.data.slice(
          result.data_len - 10,
          result.data_len - 1
        )
        anomalyRows
        setAnomalyData(
          anomalyRows.map((row) => {
            return {
              ...row,
              timestamp: new Date(row.timestamp).toLocaleString(),
              anomaly_score: Math.round(row.anomaly_score * 1000) / 1000,
              current_anomaly_score:
                Math.round(row.current_anomaly_score * 1000) / 1000,
              vibration_anomaly_score:
                Math.round(row.vibration_anomaly_score * 1000) / 1000
            }
          })
        )
      }
    }

    fetch()
  }, [])

  return (
    <div>
      {anomalyData && (
        <List data={anomalyData} header={anomalyHeader} title="Anomaly List" />
      )}
    </div>
  )
}

export default Lists
