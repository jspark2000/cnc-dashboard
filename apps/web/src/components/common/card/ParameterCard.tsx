
const ParameterCard = ({ title, data }: { title: string, data: any }) => {
  const colors = ['text-blue-500', 'text-red-500', 'text-green-500', 'text-yellow-500', 'text-indigo-500', 'text-pink-500', 'text-purple-500', 'text-gray-500'];
  return (
    <div>
      <div className="bg-white shadow-lg rounded-lg overflow-hidden px-4 h-[160px]">
        <div className={"py-2 text-sm font-semibold my-1 " + colors[Math.floor(Math.random() * colors.length)]}>
          {title}
        </div>
        <div className="grid grid-cols-2 gap-2">
          {
            Object.keys(data).filter((key: any) => key !== 'name').map((key: any) => (
              <div className="my-1">
                <div className="text-xs text-gray-900 font-semibold">{key}</div>
                <div className="text-gray-800 font-semibold">{data[key]}</div>
              </div>
            ))
          }

        </div>

      </div>
    </div>
  );
}

export default ParameterCard;
