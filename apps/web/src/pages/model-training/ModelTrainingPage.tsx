import ParameterCard from "../../components/common/card/ParameterCard";
import ColumnChart from "../../components/common/charts/ColumnChart";
import List from "../../components/common/list/List";

const ModelTrainingPage = () => {

  const categories = [
    'AdaBoost',
    'Decision Tree',
    'Naive_Bayes',
    'Nearest_Neighbors',
    'Neural_Net',
    'QDA',
    'RBF_SVM',
    'Random_Forest'
  ];

  const series = [
    {
      data: [20, 10, 0, 30, 200, 0, 50, 250],
    },
  ];

  const performanceData = [
    { model: 'model1', anomaly_ratio: 0.1, average_loss: 0.1, ratio1: 0.1, ratio2: 0.1, ratio3: 0.1, ratio4: 0.1 },
    { model: 'model2', anomaly_ratio: 0.2, average_loss: 0.2, ratio1: 0.2, ratio2: 0.2, ratio3: 0.2, ratio4: 0.1 },
  ]

  const performanceHeader = [{name: 'Model', value: 'model'}, {name: 'Anomaly Ratio', value: 'anomaly_ratio'}, {name: 'Average Loss', value: 'average_loss'}, {name: 'Ratio 1', value: 'ratio1'}, {name: 'Ratio 2', value: 'ratio2'}, {name: 'Ratio 3', value: 'ratio3'}, {name: 'Ratio 4', value: 'ratio4'}]

  const data = [
    { rank: 1, model: 'Naive_Bayes', time: 0.081904, created_date: '2023-05-21' },
    { rank: 2, model: 'QDA', time: 0.128282, created_date: '2023-05-21' },
    { rank: 3, model: 'Decision_Tree', time: 3.773444, created_date: '2023-05-21' },
    { rank: 4, model: 'Nearest_Neighbors', time: 15.31918, created_date: '2023-05-21' },
    { rank: 5, model: 'AdaBoost', time: 21.35259, created_date: '2023-05-21' },
    { rank: 6, model: 'RBF_SVM', time: 44.558938, created_date: '2023-05-21' },
    { rank: 7, model: 'Neural_Net', time: 204.39021, created_date: '2023-05-21' },
    { rank: 8, model: 'Random_Forest', time: 267.529519, created_date: '2023-05-21' },
  ];

  const header = [
    { name: 'Rank', value: 'rank'},
    { name: 'Model', value: 'model' },
    { name: 'Time', value: 'time' },
    { name: 'Created Date', value: 'created_date' },
  ];

  const parameters = [
    { name: 'AdaBoost', learning_rate: 0.1, n_estimators: 100, random_state: 0 },
    { name: 'Decision Tree', criterion: 'gini', max_depth: 5, random_state: 0 },
    { name: 'Naive Bayes', var_smoothing: 1e-09 },
    { name: 'Nearest Neighbors', n_neighbors: 5, weights: 'uniform' },
    { name: 'Neural Net', hidden_layer_sizes: '(100,)', max_iter: 200, random_state: 0 },
    { name: 'QDA', reg_param: 0.0 },
    { name: 'RBF SVM', C: 1.0, gamma: 'scale' },
    { name: 'Random Forest', max_depth: 5, n_estimators: 10, random_state: 0 },
  ];

  return (
    <div>
      {/* <h1>Model Training Page</h1> */}
      <div className="flex w-full">
      <div className="w-1/2 mt-8 flow-root pl-6 pr-10">
        <div className="font-semibold text-gray-800 text-lg mb-2">
          모델별 학습소요시간
        </div>
        <ColumnChart series={series} labels={categories} height={450} />
        </div>
        <div className="w-1/2">
          <List data={data} header={header} title="6개월 평균 학습소요시간" />
        </div>
      </div>

      <div className="grid grid-cols-4 gap-4 mt-8 px-6">
        {
          parameters.map((parameter, index) => (
            <ParameterCard key={index} title={parameter.name} data={parameter} />
          ))
        }
      </div>

    </div>
  )
}

export default ModelTrainingPage
