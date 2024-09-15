const ProductionFactorCard = ({
  title,
  category,
  data
}: {
  title: string
  category: string
  data: { good: number; now: number }
}) => {
  return (
    <div className="overflow-hidden rounded-lg bg-white px-4 py-1 shadow-lg">
      <div className="my-1 flex items-center gap-x-1 py-2">
        <h2 className="text-sm font-bold">{title}</h2>
        <h2 className="text-sm font-normal text-gray-400">{category}</h2>
      </div>
      <div className="my-1 flex items-center justify-start">
        <div className="mr-2 h-[8px] w-[8px] rounded-full bg-green-600"></div>
        <div className="text-xs font-semibold text-gray-900">GOOD</div>
      </div>
      <div className="mb-3 mt-1 font-extrabold text-green-500">
        {data.good && data.good.toFixed(2)}
      </div>

      <div className="my-1 flex items-center justify-start">
        <div className="mr-2 h-[8px] w-[8px] rounded-full bg-violet-600"></div>
        <div className="text-xs font-semibold text-gray-900">NOW</div>
      </div>
      <div className="mb-2 mt-1 font-extrabold text-violet-500">
        {data.now && data.now.toFixed(2)}
      </div>
    </div>
  )
}

export default ProductionFactorCard
