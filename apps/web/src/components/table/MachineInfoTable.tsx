const MachineInfoTable: React.FC = () => {
  const data = [
    {
      id: 1,
      machine: 'WIA VF500D',
      category: '밀링',
      worker: '홍길동',
      opertaionTime: '24:00:00',
      operationStartAt: '00:02:56',
      operationEndedAt: '23:18:30',
      operationDuration: '23:15:34',
      utilRate: '85.4',
      productionItem: '1',
      productionQuantity: '123',
      defectiveQuantity: '5',
      alarm: '0'
    }
  ]

  return (
    <table className="w-full border-collapse border border-gray-400 text-center">
      <thead className="bg-gray-950/90 text-sm font-semibold text-amber-400">
        <tr>
          <th rowSpan={2} className="border border-gray-400 py-2">
            장비
          </th>
          <th rowSpan={2} className="border border-gray-400 py-2">
            구분
          </th>
          <th rowSpan={2} className="border border-gray-400 py-2">
            작업자
          </th>
          <th className="border border-gray-400 py-2">장비가동시간</th>
          <th className="border border-gray-400 py-2">작업시작</th>
          <th className="border border-gray-400 py-2">작업종료</th>
          <th className="border border-gray-400 py-2">작업시간</th>
          <th className="border border-gray-400 py-2">작업가동률</th>
          <th className="border border-gray-400 py-2">생산품목</th>
          <th className="border border-gray-400 py-2">생산수량</th>
          <th className="border border-gray-400 py-2">불량수량</th>
          <th className="border border-gray-400 py-2">알람</th>
        </tr>
        <tr>
          <th className="border border-gray-400 py-2 text-xs">h:m:s</th>
          <th className="border border-gray-400 py-2 text-xs">h:m:s</th>
          <th className="border border-gray-400 py-2 text-xs">h:m:s</th>
          <th className="border border-gray-400 py-2 text-xs">h:m:s</th>
          <th className="border border-gray-400 py-2 text-xs">%</th>
          <th className="border border-gray-400 py-2 text-xs">EA</th>
          <th className="border border-gray-400 py-2 text-xs">EA</th>
          <th className="border border-gray-400 py-2 text-xs">EA</th>
          <th className="border border-gray-400 py-2 text-xs">No.</th>
        </tr>
      </thead>
      <tbody className="bg-gray-800/90 text-white font-semibold">
        {data.map((item) => (
          <tr key={item.id} className="text-sm">
            <td className="border border-gray-400 py-2">{item.machine}</td>
            <td className="border border-gray-400 py-2">{item.category}</td>
            <td className="border border-gray-400 py-2">{item.worker}</td>
            <td className="border border-gray-400 py-2">
              {item.opertaionTime}
            </td>
            <td className="border border-gray-400 py-2">{item.operationStartAt}</td>
            <td className="border border-gray-400 py-2">{item.operationEndedAt}</td>
            <td className="border border-gray-400 py-2">{item.operationDuration}</td>
            <td className="border border-gray-400 py-2">{item.utilRate}</td>
            <td className="border border-gray-400 py-2">{item.productionItem}</td>
            <td className="border border-gray-400 py-2">{item.productionQuantity}</td>
            <td className="border border-gray-400 py-2">{item.defectiveQuantity}</td>
            <td className="border border-gray-400 py-2">{item.alarm}</td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}

export default MachineInfoTable
