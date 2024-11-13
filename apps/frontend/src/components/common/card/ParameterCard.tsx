const ParameterCard = ({ title, data }: { title: string; data: any }) => {
  const colors = [
    'text-blue-500',
    'text-red-500',
    'text-green-500',
    'text-yellow-500',
    'text-indigo-500',
    'text-pink-500',
    'text-purple-500',
    'text-gray-500'
  ]
  return (
    <div>
      <div className="h-[160px] overflow-hidden rounded-lg bg-white px-4 shadow-lg">
        <div
          className={
            'my-1 py-2 text-sm font-semibold ' +
            colors[Math.floor(Math.random() * colors.length)]
          }
        >
          {title}
        </div>
        <div className="grid grid-cols-2 gap-2">
          {Object.keys(data)
            .filter((key: any) => key !== 'name')
            .map((key: any, index) => (
              <div className="my-1" key={index}>
                <div className="text-xs font-semibold text-gray-900">{key}</div>
                <div className="font-semibold text-gray-800">{data[key]}</div>
              </div>
            ))}
        </div>
      </div>
    </div>
  )
}

export default ParameterCard
