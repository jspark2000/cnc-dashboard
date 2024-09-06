import { useEffect, useState } from 'react'
import ParameterCard from '../../components/common/card/ParameterCard'
import ColumnChart from '../../components/common/charts/ColumnChart'
import List from '../../components/common/list/List'
import axios from 'axios'

const ModelTrainingPage = () => {
  const [models, setModels] = useState<any[]>([])
  const [series, setSeries] = useState<{ data: number[] }[]>([])
  const [params, setParams] = useState<any>([])

  const categories = [
    'LightGBM',
    'XGBoost',
    'ExtraTree',
    'Stacked CNN',
    'ResNet50',
    'GoogleNet',
    'EfficientNet',
    'ExtraTree',
    'RandomForest'
  ]

  useEffect(() => {
    const fetchModelData = async () => {
      const data = await axios
        .get('http://127.0.0.1:4000/model_evaluation')
        .then((result) => result.data)

      const temp = categories.map((category) => {
        const target = data.filter((item: any) => item.model === category)[0]

        if (!target) return

        return {
          model: category,
          time: target.duration,
          created_date: target.created_date
        }
      })

      const temp2 = categories.map((category) => {
        const target = data.filter((item: any) => item.model === category)[0]

        if (!target) return

        return {
          name: category,
          ...target.parameters
        }
      })

      setModels(
        temp.sort((a, b) => {
          return a?.time - b?.time
        })
      )
      setSeries([
        {
          data: temp.map((item) => item?.time.toFixed(1))
        }
      ])
      setParams(temp2)
    }

    fetchModelData()
  }, [])

  const header = [
    { name: 'Model', value: 'model' },
    { name: 'Time(s)', value: 'time' },
    { name: 'Created Date', value: 'created_date' }
  ]

  const parameters = [
    {
      name: 'AdaBoost',
      learning_rate: 0.1,
      n_estimators: 100,
      random_state: 0
    },
    { name: 'Decision Tree', criterion: 'gini', max_depth: 5, random_state: 0 },
    { name: 'Naive Bayes', var_smoothing: 1e-9 },
    { name: 'Nearest Neighbors', n_neighbors: 5, weights: 'uniform' },
    {
      name: 'Neural Net',
      hidden_layer_sizes: '(100,)',
      max_iter: 200,
      random_state: 0
    },
    { name: 'QDA', reg_param: 0.0 },
    { name: 'RBF SVM', C: 1.0, gamma: 'scale' },
    { name: 'Random Forest', max_depth: 5, n_estimators: 10, random_state: 0 }
  ]

  return (
    <div>
      <div className="flex w-full">
        <div className="mt-8 flow-root w-1/2 pl-6 pr-10">
          <div className="mb-2 text-lg font-semibold text-gray-800">
            모델별 학습소요시간
          </div>
          <ColumnChart series={series} labels={categories} height={450} />
        </div>
        <div className="w-1/2">
          <List data={models} header={header} title="6개월 평균 학습소요시간" />
        </div>
      </div>

      <div className="mt-8 grid grid-cols-4 gap-4 px-6">
        {params.map((parameter: any, index: any) => (
          <ParameterCard key={index} title={parameter.name} data={parameter} />
        ))}
      </div>
    </div>
  )
}

export default ModelTrainingPage
