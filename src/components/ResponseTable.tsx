interface ResponseTableProps {
  title: string
  headers: string[]
  rows: string[][]
}

const ResponseTable = ({ title, headers, rows }: ResponseTableProps) => {
  return (
    <div className="mb-8">
      <h3 className="text-white font-semibold mb-3">{title}</h3>
      <div className="bg-[#1a1a1a] rounded-lg overflow-hidden">
        <table className="w-full border-collapse">
          <thead>
            <tr className="border-b border-white/10">
              {headers.map((header) => (
                <th key={header} className="px-4 py-2 text-left text-sm font-medium text-gray-400">
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row, index) => (
              <tr key={index} className="border-b border-white/10 last:border-0">
                {row.map((cell, cellIndex) => (
                  <td
                    key={cellIndex}
                    className={`px-4 py-2 text-sm ${
                      cellIndex === 0
                        ? 'font-mono text-white'
                        : cellIndex === 1
                        ? 'font-mono text-blue-400'
                        : 'text-gray-300'
                    }`}
                  >
                    {cell}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default ResponseTable 