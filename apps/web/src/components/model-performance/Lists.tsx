import List from '../common/list/List';

const Lists = () => {

  const anomalyData = [
    {timestamp: '2021-10-01 00:00:00', loss_mae:0.1, severity: 1, anomaly_score: 0.1, threshold: 0.1, anomaly: 0},
    {timestamp: '2021-10-01 01:00:00', loss_mae:0.2, severity: 1, anomaly_score: 0.2, threshold: 0.2, anomaly: 0},
  ]

  const anomalyHeader = [{name: 'Timestamp', value: 'timestamp'}, {name: 'Loss Mae', value: 'loss_mae'}, {name: 'Severity(심각도)', value: 'severity'}, {name: 'Anomaly Score', value: 'anomaly_score'}, {name: 'Threshold', value: 'threshold'}, {name: 'Anomaly', value: 'anomaly'}]

  const performanceData = [
    { model: 'model1', anomaly_ratio: 0.1, average_loss: 0.1, ratio1: 0.1, ratio2: 0.1, ratio3: 0.1, ratio4: 0.1 },
    { model: 'model2', anomaly_ratio: 0.2, average_loss: 0.2, ratio1: 0.2, ratio2: 0.2, ratio3: 0.2, ratio4: 0.1 },
  ]

  const performanceHeader = [{name: 'Model', value: 'model'}, {name: 'Anomaly Ratio', value: 'anomaly_ratio'}, {name: 'Average Loss', value: 'average_loss'}, {name: 'Ratio 1', value: 'ratio1'}, {name: 'Ratio 2', value: 'ratio2'}, {name: 'Ratio 3', value: 'ratio3'}, {name: 'Ratio 4', value: 'ratio4'}]

  return (
    <div>
      <List data={anomalyData} header={anomalyHeader} title="Anomaly List" />
      <List data={performanceData} header={performanceHeader} title="모델별 성능" />
    </div>
  );
}

export default Lists;
