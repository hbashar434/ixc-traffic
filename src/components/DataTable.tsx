import React from "react";

interface DataTableProps {
  data: Array<{ [key: string]: string | number }>;
}

const DataTable: React.FC<DataTableProps> = ({ data }) => {
  const columnColors = [
    "bg-green-100",
    "bg-blue-100",
    "bg-yellow-100",
    "bg-purple-100",
    // You can add more colors here if needed
  ];

  return (
    <div className="mt-4 overflow-x-auto">
      <table className="min-w-full mt-2 border-collapse border border-gray-300 text-sm">
        <thead>
          <tr className="bg-gray-200">
            {data.length > 0 &&
              Object.keys(data[0]).map((key, idx) => (
                <th
                  key={idx}
                  className="border border-gray-300 px-4 py-2 text-left"
                >
                  {key}
                </th>
              ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, rowIndex) => {
            const codeValue = row["Code"];

            return (
              <tr key={rowIndex} className="border-b border-gray-300">
                {Object.values(row).map((value, colIndex) => (
                  <td
                    key={colIndex}
                    className={`border border-gray-300 px-4 py-2 ${
                      codeValue === "False" && colIndex === 0
                        ? "bg-red-600 text-white font-semibold"
                        : columnColors[colIndex % columnColors.length]
                    }`}
                  >
                    {value}
                  </td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default DataTable;
