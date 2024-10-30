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

  // Helper function to format "Results" values
  const formatResultsValue = (value: string | number) => {
    if (typeof value === "string") {
      const match = value.match(/([a-zA-Z]+) \(([-\d.]+)\)/);
      if (match) {
        const [, prefix, numberString] = match;
        const numValue = parseFloat(numberString);
        const formattedNumber =
          numValue % 1 === 0 ? numValue : numValue.toFixed(2);
        return `${prefix} (${formattedNumber})`;
      }
    }
    return value;
  };

  if (!data || !Array.isArray(data)) {
    return <div>No data available</div>;
  }

  if (data.length === 0) {
    return <div className="text-center mt-2">No records to display!</div>;
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
                {Object.entries(row).map(([key, value], colIndex) => {
                  const isCodeFalse = codeValue === "False" && colIndex === 0;

                  // Format ASR as a percentage or Results as specified
                  const formattedValue =
                    key === "ASR"
                      ? `${Math.round((value as number) * 100)}%`
                      : key === "Results"
                      ? formatResultsValue(value)
                      : value;

                  return (
                    <td
                      key={colIndex}
                      className={`border border-gray-300 px-4 py-2 ${
                        isCodeFalse
                          ? "bg-red-600 text-white font-semibold"
                          : columnColors[colIndex % columnColors.length]
                      }`}
                    >
                      {formattedValue}
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
