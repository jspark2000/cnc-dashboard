const ItemInfoTable: React.FC = () => {
  const data = [{
    no: 1,
    item: 'APH 034_036 MAIN / O7332',
    share: 100,
    alarm: '0',
    processes: [
      {
        no: 1,
        time: 2.15
      },
      {
        no: 20,
        time: 0.75
      },
      {
        no: 14,
        time: 0.49
      },
      {
        no: 5,
        time: 4.32
      },
      {
        no: 6,
        time: 2.60
      },
      {
        no: 7,
        time: 0.65
      },
      {
        no: 8,
        time: 0.54
      },
      {
        no: 9,
        time: 1.58
      }
    ],
    working_time: "23:15:34",
    process_min: "8.7",
    loading_min: "0.2",
    availability: {
      actual_min: "1118.7",
      schedule_min: "1205.0",
      ratio: 93
    },
    performance: {
      production_amount: 128,
      schedule_amount: 156,
      ratio: 81.8
    },
    quality: {
      accept_amount: 123,
      defective_amount: 5,
      ratio: 96
    }
  }]

  return (
    <table className="w-full border-collapse border border-gray-400 text-center">
      <thead className="bg-gray-950/90 text-sm font-semibold text-amber-400">
        <tr>
          <th rowSpan={3} className="border border-gray-400 p-2">
            No.
          </th>
          <th rowSpan={3} className="border border-gray-400 p-2">
            품목
          </th>
          <th rowSpan={2} className="border border-gray-400 p-2">
            점유율
          </th>
          <th rowSpan={2} className="border border-gray-400 p-2">
            알람
          </th>
          <th rowSpan={2} className="border border-gray-400 p-2">
            가공공구(사용시간)
          </th>
          <th rowSpan={2} className="border border-gray-400 p-2">
            작업시간
          </th>
          <th rowSpan={2} className="border border-gray-400 p-2">
            단품가공시간
          </th>
          <th rowSpan={2} className="border border-gray-400 p-2">
            단품로딩시간
          </th>
          <th colSpan={3} className="border border-gray-400 p-2">
            가용성
          </th>
          <th colSpan={3} className="border border-gray-400 p-2">
            성능
          </th>
          <th colSpan={3} className="border border-gray-400 p-2">
            품질
          </th>
        </tr>
        <tr>
          <th className="border border-gray-400 p-2 text-xs">가공시간</th>
          <th className="border border-gray-400 p-2 text-xs">계획가공시간</th>
          <th className="border border-gray-400 p-2 text-xs">가용성</th>
          <th className="border border-gray-400 p-2 text-xs">생산수량</th>
          <th className="border border-gray-400 p-2 text-xs">계획수량</th>
          <th className="border border-gray-400 p-2 text-xs">성능</th>
          <th className="border border-gray-400 p-2 text-xs">양품</th>
          <th className="border border-gray-400 p-2 text-xs">불량품</th>
          <th className="border border-gray-400 p-2 text-xs">품질</th>
        </tr>
        <tr>
          <th className="border border-gray-400 p-2 text-xs">(%)</th>
          <th className="border border-gray-400 p-2 text-xs">(No.)</th>
          <th className="border border-gray-400 p-2 text-xs">(No./h)</th>
          <th className="border border-gray-400 p-2 text-xs">(h:m:s)</th>
          <th className="border border-gray-400 p-2 text-xs">(min)</th>
          <th className="border border-gray-400 p-2 text-xs">(min)</th>
          <th className="border border-gray-400 p-2 text-xs">(min)</th>
          <th className="border border-gray-400 p-2 text-xs">(min)</th>
          <th className="border border-gray-400 p-2 text-xs">(%)</th>
          <th className="border border-gray-400 p-2 text-xs">(EA)</th>
          <th className="border border-gray-400 p-2 text-xs">(EA)</th>
          <th className="border border-gray-400 p-2 text-xs">(%)</th>
          <th className="border border-gray-400 p-2 text-xs">(EA)</th>
          <th className="border border-gray-400 p-2 text-xs">(EA)</th>
          <th className="border border-gray-400 p-2 text-xs">(%)</th>
        </tr>
      </thead>
      <tbody className="bg-gray-800/90 font-semibold text-white">
        {data.map((it, index) => (
          <tr key={index} className="text-sm">
            <td className="border border-gray-400 p-2 whitespace-normal break-words">{it.no}</td>
            <td className="border border-gray-400 p-2 whitespace-normal break-words">{it.item}</td>
            <td className="border border-gray-400 p-2 whitespace-normal break-words">{it.share}</td>
            <td className="border border-gray-400 p-2 whitespace-normal break-words">{it.alarm}</td>
            <td className="border border-gray-400 p-2 whitespace-normal break-words">{it.processes.toString()}</td>
            <td className="border border-gray-400 p-2 whitespace-normal break-words">{it.working_time}</td>
            <td className="border border-gray-400 p-2 whitespace-normal break-words">{it.process_min}</td>
            <td className="border border-gray-400 p-2 whitespace-normal break-words">{it.loading_min}</td>
            <td className="border border-gray-400 p-2 whitespace-normal break-words">{it.availability.actual_min}</td>
            <td className="border border-gray-400 p-2 whitespace-normal break-words">{it.availability.schedule_min}</td>
            <td className="border border-gray-400 p-2 whitespace-normal break-words">{it.availability.ratio}%</td>
            <td className="border border-gray-400 p-2 whitespace-normal break-words">{it.performance.production_amount}</td>
            <td className="border border-gray-400 p-2 whitespace-normal break-words">{it.performance.production_amount}</td>
            <td className="border border-gray-400 p-2 whitespace-normal break-words">{it.performance.ratio}%</td>
            <td className="border border-gray-400 p-2 whitespace-normal break-words">{it.quality.accept_amount}</td>
            <td className="border border-gray-400 p-2 whitespace-normal break-words">{it.quality.defective_amount}</td>
            <td className="border border-gray-400 p-2 whitespace-normal break-words">{it.quality.ratio}%</td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}

export default ItemInfoTable
