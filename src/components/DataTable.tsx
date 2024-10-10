import React from "react";

interface DataTableProps {
  data: Array<{ [key: string]: string | number }>;
}

const DataTable: React.FC<DataTableProps> = ({ data }) => {
  const columnColors = [
    "bg-emerald-100",
    "bg-blue-100",
    "bg-yellow-100",
    "bg-purple-100",
    "bg-indigo-100",
  ];

  if (!data || !Array.isArray(data)) {
    return <div>No data available</div>;
  }

  if (data.length === 0) {
    return <div className="text-center">No records to display</div>;
  }

  return (
    <div className="mt-4 overflow-x-auto">
      <table className="min-w-full mt-2 border-collapse border border-gray-300 text-sm">
        <thead>
          <tr className="bg-gray-200">
            {Object.keys(data[0]).map((key, idx) => (
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
                {Object.values(row).map((value, colIndex) => {
                  const isCodeFalse = codeValue === "False" && colIndex === 0;

                  return (
                    <td
                      key={colIndex}
                      className={`border border-gray-300 px-4 py-2 ${
                        isCodeFalse
                          ? "bg-red-600 text-white font-semibold"
                          : columnColors[colIndex % columnColors.length]
                      }`}
                    >
                      {value}
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default DataTable;
