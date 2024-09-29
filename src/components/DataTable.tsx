import React from "react";

interface DataTableProps {
  data: Array<{ [key: string]: string | number }>;
}

const DataTable: React.FC<DataTableProps> = ({ data }) => {
  // Define an array of colors for the columns
  const columnColors = [
    "bg-red-100",    // 1st column
    "bg-green-100",  // 2nd column
    "bg-blue-100",   // 3rd column
    "bg-yellow-100", // 4th column
    "bg-purple-100", // 5th column, etc.
  ];

  return (
    <div className="mt-4 overflow-x-auto">
      <table className="min-w-full mt-2 border-collapse border border-gray-300 text-sm">
        <thead>
          <tr className="bg-gray-200">
            {data.length > 0 &&
              Object.keys(data[0]).map((key, idx) => (
                <th
                  key={key}
                  className="border border-gray-300 px-4 py-2 text-left"
                >
                  {key}
                </th>
              ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, rowIndex) => (
            <tr key={rowIndex} className="border-b border-gray-300">
              {Object.values(row).map((value, colIndex) => (
                <td
                  key={colIndex}
                  className={`border border-gray-300 px-4 py-2 ${
                    columnColors[colIndex % columnColors.length] // Apply color based on column index
                  }`}
                >
                  {value}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DataTable;
