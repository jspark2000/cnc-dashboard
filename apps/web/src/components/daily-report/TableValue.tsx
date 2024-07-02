const TableValue = ({ value }: { value: string }) => {
  return (
    <div className="flex h-12 items-center justify-center border-l border-gray-400 p-1 text-xs">
      {value}
    </div>
  )
}

export default TableValue
