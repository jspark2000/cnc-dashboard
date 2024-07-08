
const ProductionFactorCard = ({ title, data }: { title: string, data: { good: number, now: number } }) => {

  return (
    <div className="bg-white shadow-lg rounded-lg overflow-hidden px-4">
      <div className="py-2 text-sm font-semibold my-1">
        {title}
      </div>
      <div className="flex justify-start items-center my-1">
        <div className="w-[8px] h-[8px] rounded-full bg-blue-500 mr-2"></div>
        <div className="text-xs text-gray-900 font-semibold">GOOD</div>
      </div>
      <div className="text-blue-500 font-extrabold mt-1 mb-3">
        {data.good}
      </div>

      <div className="flex justify-start items-center my-1">
        <div className="w-[8px] h-[8px] rounded-full bg-red-500 mr-2"></div>
        <div className="text-xs text-gray-900 font-semibold">NOW</div>
      </div>
      <div className="text-red-500 font-extrabold mt-1 mb-2">
        {data.now}
      </div>

    </div>
  )
}

export default ProductionFactorCard
