
const TableTitle = ({ title, unit }: { title: string, unit: string }) => {
  return (
    <div className="flex flex-col items-center justify-center h-16 border border-gray-400 p-2 bg-gray-400">
      <div className="text-sm whitespace-pre font-bold text-white">{title}</div>
      {unit === "" ? null : <div className="text-sm whitespace-pre font-bold text-white"> {"( "+unit+" )"} </div>}
    </div>
  )
}

export default TableTitle
