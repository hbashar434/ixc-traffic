import { useState } from "react";
import DataTable from "./DataTable";

interface DataItem {
  [key: string]: string | number;
}

interface TabsProps {
  data: DataItem[];
}

const Tabs: React.FC<TabsProps> = ({ data }) => {
  const [activeTab, setActiveTab] = useState<string | null>(null);
  const [unknownData, setUnknownData] = useState<DataItem[]>(data); // Initialize unknown data

  // List of tab names
  const tabNames = ["unknown", "low-acd", "low-asr", "high-pdd"]; // All tab names

  // Function to handle tab selection and filtering for unknown data
  const handleTabSelection = (tabName: string) => {
    setActiveTab(tabName);

    // Filter and sort logic for "unknown" tab only (case insensitive)
    if (tabName === "unknown") {
      const filteredData = data.filter(
        (item) =>
          typeof item.Operator === "string" &&
          item.Operator.toLowerCase() === "unknown"
      );

      // Sort filtered data by "Count" high to low
      const sortedData = filteredData.sort((a, b) => {
        const countA = typeof a.Count === "number" ? a.Count : 0;
        const countB = typeof b.Count === "number" ? b.Count : 0;
        return countB - countA; // Sort in descending order
      });

      setUnknownData(sortedData);
    } else {
      setUnknownData(data); // Reset to original data if not filtering
    }
  };

  return (
    <section className="p-4">
      {/* Center the Tab Buttons */}
      <div className="mb-4 flex justify-center space-x-4">
        {tabNames.map((tabName) => (
          <button
            key={tabName}
            className={`px-4 py-2 rounded ${
              activeTab === tabName
                ? "bg-indigo-600 text-white"
                : "bg-indigo-200 text-black"
            } hover:bg-indigo-700 hover:text-white transition`}
            onClick={() => handleTabSelection(tabName)} // Use the specific handler
          >
            {tabName.charAt(0).toUpperCase() +
              tabName.slice(1).replace("-", " ")}
          </button>
        ))}
      </div>

      {/* Display filtered and sorted data */}
      <div>
        {activeTab === "unknown" && <DataTable data={unknownData} />}{" "}
        {/* Pass filtered and sorted data only for unknown */}
      </div>
    </section>
  );
};

export default Tabs;
