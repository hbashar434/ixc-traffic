import { useState } from "react";
import DataTable from "./DataTable"; // Import your existing DataTable component

interface TabsProps {
  data: Array<{ [key: string]: string | number }>;
}

const Tabs: React.FC<TabsProps> = ({ data }) => {
  const [activeTab, setActiveTab] = useState<string | null>(null); // Default no active tab

  // Function to filter data based on the selected tab
  const filterData = () => {
    if (activeTab === null) {
      return data; // Show all data if no tab is active
    }

    switch (activeTab) {
      case "Unknown":
        return data.filter((item) => item["Code"] === "False");
      case "Low ASR":
        return data.filter((item) => {
          const asrValue = Number(item["ASR"]); // Convert to number
          return asrValue < 0.5; // Adjust threshold as needed
        });
      case "Low ACD":
        return data.filter((item) => {
          const acdValue = Number(item["ACD"]); // Convert to number
          return acdValue < 1; // Adjust threshold as needed
        });
      case "High PDD":
        return data.filter((item) => {
          const pddValue = Number(item["PDD"]); // Convert to number
          return pddValue > 5; // Adjust threshold as needed
        });
      default:
        return data;
    }
  };

  // Filtered data based on the active tab
  const filteredData = filterData();

  return (
    <section className="flex flex-col items-center">
      <div className="flex space-x-4 mb-4">
        {/* Tabs for filtering */}
        {["Unknown", "Low ASR", "Low ACD", "High PDD"].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 rounded-lg ${
              activeTab === tab
                ? "bg-blue-500 text-white"
                : "bg-gray-200 text-black"
            }`}
          >
            {tab}
          </button>
        ))}
        <button
          onClick={() => setActiveTab(null)}
          className={`px-4 py-2 rounded-lg ${
            activeTab === null
              ? "bg-blue-500 text-white"
              : "bg-gray-200 text-black"
          }`}
        >
          Show All
        </button>
      </div>

      {/* Use DataTable to display filtered data */}
      {filteredData.length > 0 ? (
        <DataTable data={filteredData} />
      ) : (
        <p>No data available for this filter.</p>
      )}
    </section>
  );
};

export default Tabs;
