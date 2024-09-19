import TableTitle from '../common/table/TableTitle'
import TableValue from '../common/table/TableValue'

const SectionTitle = ({ title }: { title: string }) => {
  return (
    <div className="z-10 flex h-6 w-full items-start justify-center bg-gray-500">
      <h2 className="z-10 pt-[3px] text-xs font-semibold text-white">
        {title}
      </h2>
    </div>
  )
}

const ItemTable = () => {
  const data = [
    { title: 'No', value: '1', unit: '' },
    { title: '품목', value: 'APH 034 MAIN / O7332', unit: '' },
    { title: '점유율', value: '100', unit: '%' },
    { title: '알람', value: '0', unit: 'No./h' },
    {
      title: '가공공구(사용시간)',
      value:
        '1 (정삭)',
      unit: ''
    },
    { title: '작업시간', value: '07:38:00', unit: 'h:m:s' },
    { title: '단품가공시간', value: '8.7', unit: 'min' },
    { title: '단품로딩시간', value: '0.2', unit: 'min' }
  ]

  const availabilityData = [
    { title: '가공시간', value: '1407.8', unit: 'min' },
    { title: '계획가공시간', value: '1408.0', unit: 'min' },
    { title: '가용성', value: '100', unit: '%' }
  ]

  const performanceData = [
    { title: '생산수량', value: '161', unit: 'EA' },
    { title: '계획수량', value: '161', unit: 'EA' },
    { title: '성능', value: '100', unit: '%' }
  ]

  const qualityData = [
    { title: '양품', value: '161', unit: 'EA' },
    { title: '불량품', value: '0', unit: 'EA' },
    { title: '품질', value: '100', unit: '%' }
  ]

  return (
    <div className="flex w-full border-b border-r border-gray-400">
      <div className="flex w-3/5 border-b-2 border-l-2 border-gray-500">
        {data.map((item, index) => (
          <div key={index} className="">
            <div className="z-10 flex h-6 w-full items-start justify-center border-t-2 border-gray-500 bg-gray-400"></div>
            <TableTitle title={item.title} unit={item.unit} />
            <TableValue value={item.value} />
          </div>
        ))}
      </div>

      <div className="border-b-2 border-l-2 border-r-2 border-gray-500">
        <SectionTitle title="가용성" />
        <div className="flex">
          {availabilityData.map((item, index) => (
            <div key={index} className="">
              <TableTitle title={item.title} unit={item.unit} />
              <TableValue value={item.value} />
            </div>
          ))}
        </div>
      </div>
      <div className="border-b-2 border-r-2 border-gray-500">
        <SectionTitle title="성능" />
        <div className="flex">
          {performanceData.map((item, index) => (
            <div key={index} className="">
              <TableTitle title={item.title} unit={item.unit} />
              <TableValue value={item.value} />
            </div>
          ))}
        </div>
      </div>

      <div className="border-b-2 border-r-2 border-gray-500">
        <SectionTitle title="품질" />
        <div className="flex">
          {qualityData.map((item, index) => (
            <div key={index} className="">
              <TableTitle title={item.title} unit={item.unit} />
              <TableValue value={item.value} />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default ItemTable
