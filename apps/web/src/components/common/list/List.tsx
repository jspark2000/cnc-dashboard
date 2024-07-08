
const List = ({ data, header, title }: any) => {

  return (
    <div className="mt-8 flow-root pl-6 pr-10">
      <div className="font-semibold text-gray-800 text-lg mb-2">
        {title}
      </div>
    <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
      <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
        <table className="min-w-full divide-y divide-gray-300">
          <thead>
            <tr>
              {header.map((h: any) => (
                <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-xs font-semibold text-gray-800 sm:pl-0">
                  {h.name}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {data.map((d: any) => (
              <tr>
                {Object.keys(d).map((key: any) => (
                  <td className="whitespace-nowrap py-4 pl-4 pr-3 text-xs font-medium text-gray-800 sm:pl-0">
                    {d[key]}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  </div>
  )
}

export default List
