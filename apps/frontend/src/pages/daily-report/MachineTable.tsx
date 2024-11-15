import TableTitle from '@/components/common/table/TableTitle'
import TableValue from '@/components/common/table/TableValue'

const MachineTable = () => {
  const data = [
    { title: '장비', value: 'WIAVF500D', unit: '' },
    { title: '구분', value: '밀링', unit: '' },
    { title: '작업자', value: '작업자', unit: '' },
    { title: '장비가동시간', value: '16:00:00', unit: 'h:m:s' },
    { title: '작업시작', value: '08:00:00', unit: 'h:m:s' },
    { title: '작업종료', value: '00:00:00', unit: 'h:m:s' },
    { title: '작업시간', value: '16:00:00', unit: 'h:m:s' },
    { title: '장비가동률', value: '81.4', unit: '%' },
    { title: '생산품목', value: '1', unit: '' },
    { title: '생산수량', value: '1212', unit: 'EA' },
    { title: '불량수량', value: '5', unit: 'EA' },
    { title: '알람', value: '0', unit: '' }
  ]

  return (
    <div className="grid w-full grid-cols-12 border-b border-r border-gray-400">
      {data.map((item, index) => (
        <div key={index} className="">
          <TableTitle title={item.title} unit={item.unit} />
          <TableValue value={item.value} />
        </div>
      ))}
    </div>
  )
}

export default MachineTable
