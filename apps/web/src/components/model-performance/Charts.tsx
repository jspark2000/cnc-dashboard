

import LineChart from '../common/charts/LineChart'
import PieChart from '../common/charts/PieChart'

const Charts = () => {
  // const modelPerformance = data?.modelerformance;

  const lossSeries = [
    { name: 'Loss Mae', data: [0, 0, 0]},
    { name: 'Threshold 1', data: [1.0, 1.0, 1.0]},
    { name: 'Threshold 2', data: [2.0, 2.0, 2.0]},
    { name: 'Threshold 3', data: [3.0, 3.0, 3.0]},
  ]

  const lossRateSeries = [100, 0, 0]

  return (
    <div>
      <h2></h2>
      <div className="mt-3 flex w-full h-[250px] items-center">
        <div className="w-2/3">
        <div className="ml-6 text-sm font-bold text-gray-700">
          단계별 이상치 분포
        </div>
          <LineChart series={lossSeries} categories={['Loss Mae', 'Threshold 1', 'Threshold 2', 'Threshold 3']} />

        </div>
        <div className="w-1/3">
        <PieChart
              series={lossRateSeries}
              labels={['lv1_ratio', 'lv2_ratio', 'lv3_ratio']}
              title="단계별 이상치 비중"
            />
        </div>
      </div>
    </div>
  );
}

export default Charts;
