const TableTitle = ({ title, unit }: { title: string; unit: string }) => {
  return (
    <div className="flex h-16 flex-col items-center justify-center border border-gray-400 bg-gray-400 p-2">
      <div className="whitespace-pre text-sm font-bold text-white">{title}</div>
      {unit === '' ? null : (
        <div className="whitespace-pre text-sm font-bold text-white">
          {' '}
          {'( ' + unit + ' )'}{' '}
        </div>
      )}
    </div>
  )
}

export default TableTitle
