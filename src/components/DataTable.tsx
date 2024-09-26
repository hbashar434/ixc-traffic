import React from "react";

interface DataTableProps {
  data: Array<{ [key: string]: string | number }>;
}

const DataTable: React.FC<DataTableProps> = ({ data }) => {
  return (
    <div className="mt-4 overflow-x-auto">
      <table className="min-w-full mt-2 border-collapse border border-gray-300 text-sm">
        <thead>
          <tr className="bg-gray-200">
            {data.length > 0 &&
              Object.keys(data[0]).map((key) => (
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
          {data.map((row, index) => (
            <tr key={index} className="border-b border-gray-300">
              {Object.values(row).map((value, idx) => (
                <td key={idx} className="border border-gray-300 px-4 py-2">
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
