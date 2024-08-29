import { useEffect, useState } from 'react'
import List from '../common/list/List'

const Lists = () => {
  const [powerData, setPowerData] = useState<number[]>([0, 0, 0, 0])
  const [currentData, setCurrentData] = useState<number[]>([0, 0])
  const [voltageData, setVoltageData] = useState<number[]>([0, 0])

  const anomalyData = [
    {
      timestamp: '2021-10-01 00:00:00',
      loss_mae: 0.1,
      severity: 1,
      anomaly_score: 0.1,
      threshold: 0.1,
      anomaly: 0
    },
    {
      timestamp: '2021-10-01 01:00:00',
      loss_mae: 0.2,
      severity: 1,
      anomaly_score: 0.2,
      threshold: 0.2,
      anomaly: 0
    }
  ]

  const anomalyHeader = [
    { name: 'Timestamp', value: 'timestamp' },
    { name: 'Loss Mae', value: 'loss_mae' },
    { name: 'Severity(심각도)', value: 'severity' },
    { name: 'Anomaly Score', value: 'anomaly_score' },
    { name: 'Threshold', value: 'threshold' },
    { name: 'Anomaly', value: 'anomaly' }
  ]

  const performanceData = [
    {
      model: 'model1',
      anomaly_ratio: 0.1,
      average_loss: 0.1,
      ratio1: 0.1,
      ratio2: 0.1,
      ratio3: 0.1,
      ratio4: 0.1
    },
    {
      model: 'model2',
      anomaly_ratio: 0.2,
      average_loss: 0.2,
      ratio1: 0.2,
      ratio2: 0.2,
      ratio3: 0.2,
      ratio4: 0.1
    }
  ]

  const performanceHeader = [
    { name: 'Model', value: 'model' },
    { name: 'Anomaly Ratio', value: 'anomaly_ratio' },
    { name: 'Average Loss', value: 'average_loss' },
    { name: 'Ratio 1', value: 'ratio1' },
    { name: 'Ratio 2', value: 'ratio2' },
    { name: 'Ratio 3', value: 'ratio3' },
    { name: 'Ratio 4', value: 'ratio4' }
  ]

  const fetchData = async () => {
    try {
      const powerResponse = await fetch(
        'http://127.0.0.1:8002/production-factor/Apparent_Power_Va3'
      )
      const powerResult = (await powerResponse.json()) as any

      const currentResponse = await fetch(
        'http://127.0.0.1:8002/production-mean-and-rms/Line_Current_L3'
      )
      const currentResult = (await currentResponse.json()) as any

      const voltageResponse = await fetch(
        'http://127.0.0.1:8002/production-mean-and-rms/Line_Voltage_V31'
      )
      const voltageResult = (await voltageResponse.json()) as any

      setPowerData([
        powerResult.rms,
        powerResult.mean,
        powerResult.impact_factor,
        powerResult.crest_factor
      ])
      setCurrentData([currentResult.rms, currentResult.mean])
      setVoltageData([voltageResult.rms, voltageResult.mean])
    } catch (error) {
      console.error('Error fetching data:', error)
    }
  }

  useEffect(() => {
    fetchData()

    const intervalId = setInterval(() => {
      fetchData()
    }, 1000)

    return () => clearInterval(intervalId)
  }, [])

  const factorHeader = [
    { name: 'Type', value: 'type' },
    { name: 'RMS', value: 'rms' },
    { name: 'MEAN', value: 'mean' },
    { name: 'IMPACT FACTOR', value: 'impact_factor' },
    { name: 'CREST FACTOR', value: 'crest_factor' }
  ]

  const factorData = [
    {
      type: 'POWER',
      rms: powerData[0].toFixed(2),
      mean: powerData[1].toFixed(2),
      impact_factor: powerData[2].toFixed(2),
      crest_factor: powerData[3].toFixed(2)
    },
    {
      type: 'CURRENT',
      rms: currentData[0].toFixed(2),
      mean: currentData[1].toFixed(2),
      impact_factor: '-',
      crest_factor: '-'
    },
    {
      type: 'VOLTAGE',
      rms: voltageData[0].toFixed(2),
      mean: voltageData[1].toFixed(2),
      impact_factor: '-',
      crest_factor: '-'
    }
  ]

  return (
    <div>
      <List data={factorData} header={factorHeader} title="INDEX" />
      <List data={anomalyData} header={anomalyHeader} title="Anomaly List" />
      <List
        data={performanceData}
        header={performanceHeader}
        title="모델별 성능"
      />
    </div>
  )
}

export default Lists
