const ChartTitle = ({ title }: { title: string }) => {
  return (
    <div className="mr-10 flex flex-col items-center justify-center bg-gray-400 px-4 py-10">
      {title.split('').map((letter) => (
        <p className="font-bold text-white">{letter}</p>
      ))}
    </div>
  )
}

export default ChartTitle
