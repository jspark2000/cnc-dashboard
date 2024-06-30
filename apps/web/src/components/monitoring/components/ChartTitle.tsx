

const ChartTitle = ({ title }: { title: string }) => {
  return (
    <div className="w-12 h-full flex justify-center items-center bg-gray-400">
      <h2 className="text-xl w-4 h-full flex justify-center items-center font-semibold text-white">{title}</h2>
    </div>
  )
}

export default ChartTitle
