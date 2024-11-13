const ModelCard = ({
  programName,
  productNumber,
  equipmentModel
}: {
  programName: string
  productNumber: string
  equipmentModel: string
}) => {
  return (
    <div className="grid grid-cols-2 bg-gray-200 p-5">
      <div className="flex flex-col space-y-2">
        <h2 className="text-sm">현재 품번 / 프로그램명</h2>
        <p className="text-sm font-semibold">
          {productNumber} / {programName}
        </p>
      </div>
      <div className="flex flex-col space-y-2">
        <h2 className="text-sm">장비모델</h2>
        <p className="text-sm font-semibold">{equipmentModel}</p>
      </div>
    </div>
  )
}

export default ModelCard
