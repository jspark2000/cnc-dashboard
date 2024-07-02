const ChartTitle = ({ title }: { title: string }) => {
  return (
    <div className="flex h-full w-12 items-center justify-center bg-gray-400">
      <h2 className="flex h-full w-4 items-center justify-center text-xl font-semibold text-white">
        {title}
      </h2>
    </div>
  )
}

export default ChartTitle
