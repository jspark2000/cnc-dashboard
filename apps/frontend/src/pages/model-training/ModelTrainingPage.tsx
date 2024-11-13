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
    'Stacked CNN',
    'ResNet50',
    'ExtraTree',
    'RandomForest',
    'GoogleNet',
    'EfficientNet'
  ]

  const cnnBased = ['Stacked CNN', 'ResNet50', 'GoogleNet', 'EfficientNet']

  useEffect(() => {
    const fetchModelData = async () => {
      const data = await axios
        .get('http://127.0.0.1:4000/model_evaluation')
        .then((result) => result.data)

      const temp = categories.map((category) => {
        const target = data.filter((item: any) => item.model === category)[0]

        if (!target) return

        return {
          model: `${category} ${
            cnnBased.includes(category) ? '(예지보전 AI)' : '(공구최적가공 AI)'
          }`,
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

  return (
    <div>
      <div className="flex w-full">
        <div className="mt-8 flow-root w-1/2 pl-6 pr-10">
          <div className="mb-2 text-lg font-semibold text-gray-800">
            모델별 학습소요시간
          </div>
          <ColumnChart
            series={series}
            labels={models.map((item) => item.model)}
            height={450}
          />
        </div>
        <div className="w-1/2">
          <List data={models} header={header} title="6개월 평균 학습소요시간" />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 px-6">
        <h2 className="text-lg font-semibold text-zinc-800">공구최적가공 AI</h2>
        <h2 className="text-lg font-semibold text-zinc-800">예지보전 AI</h2>
      </div>

      <div className="mt-3 grid grid-cols-4 gap-4 px-6">
        {params.map((parameter: any, index: any) => (
          <ParameterCard key={index} title={parameter.name} data={parameter} />
        ))}
      </div>
    </div>
  )
}

export default ModelTrainingPage
