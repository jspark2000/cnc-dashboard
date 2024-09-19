import { useState } from 'react'
import List from '../common/list/List'
import type { AnomalyData } from '../../types/interfaces'

const Lists = () => {
  const [anomalyData, _] = useState<Partial<AnomalyData>[]>([
    {
      timestamp: new Date().toLocaleString(),
      severity: 1,
      anomaly_score: 0.2,
      current_anomaly_score: 0.125,
      vibration_anomaly_score: 0.31,
      threshold: 0.5,
      is_anomaly: 'false'
    },
    {
      timestamp: new Date(
        new Date().getTime() - 60 * 60 * 992
      ).toLocaleString(),
      severity: 3,
      anomaly_score: 0.7,
      current_anomaly_score: 0.8,
      vibration_anomaly_score: 0.4,
      threshold: 0.5,
      is_anomaly: 'true'
    },
    {
      timestamp: new Date(
        new Date().getTime() - 2 * 60 * 60 * 999
      ).toLocaleString(),
      severity: 2,
      anomaly_score: 0.4,
      current_anomaly_score: 0.56,
      vibration_anomaly_score: 0.32,
      threshold: 0.5,
      is_anomaly: 'false'
    },
    {
      timestamp: new Date(
        new Date().getTime() - 3 * 60 * 60 * 993
      ).toLocaleString(),
      severity: 1,
      anomaly_score: 0.0,
      current_anomaly_score: 0.02,
      vibration_anomaly_score: 0.29,
      threshold: 0.5,
      is_anomaly: 'false'
    },
    {
      timestamp: new Date(
        new Date().getTime() - 4 * 60 * 60 * 997
      ).toLocaleString(),
      severity: 1,
      anomaly_score: 0.1,
      current_anomaly_score: 0.02,
      vibration_anomaly_score: 0.4,
      threshold: 0.5,
      is_anomaly: 'false'
    }
  ])

  const anomalyHeader = [
    { name: 'Timestamp', value: 'timestamp' },
    { name: 'Severity(심각도)', value: 'severity' },
    { name: 'Anomaly Score', value: 'anomaly_score' },
    { name: 'Current Anomaly Score', value: 'current_anomaly_score' },
    { name: 'Vibration Anomaly Score', value: 'vibration_anomaly_score' },
    { name: 'Threshold', value: 'threshold' },
    { name: 'Anomaly', value: 'is_anomaly' }
  ]

  return (
    <div>
      {anomalyData && (
        <List data={anomalyData} header={anomalyHeader} title="Anomaly List" />
      )}
    </div>
  )
}

export default Lists
