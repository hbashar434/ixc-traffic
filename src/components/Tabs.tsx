import { useState } from "react";
import DataTable from "./DataTable"; // Import your existing DataTable component

interface DataItem {
  [key: string]: string | number;
}

interface TabsProps {
  data: DataItem[];
}

const Tabs: React.FC<TabsProps> = ({ data }) => {
  const [activeTab, setActiveTab] = useState<string | null>(null); // Default no active tab

  // Function to filter and sort data based on the selected tab
  const filterData = () => {
    let filteredData: DataItem[] = data;

    switch (activeTab) {
      case "Unknown":
        // Check if the Operator field contains the string "unknown"
        filteredData = data.filter(
          (item) =>
            typeof item["Operator"] === "string" &&
            item["Operator"].toLowerCase().includes("unknown")
        );
        break;
      case "Low ASR":
        filteredData = data.filter((item) => {
          const asrValue = Number(item["ASR"]); // Convert to number
          return asrValue < 0.5; // Adjust threshold as needed
        });
        break;
      case "Low ACD":
        filteredData = data.filter((item) => {
          const acdValue = Number(item["ACD"]); // Convert to number
          return acdValue < 1; // Adjust threshold as needed
        });
        break;
      case "High PDD":
        filteredData = data.filter((item) => {
          const pddValue = Number(item["PDD"]); // Convert to number
          return pddValue > 5; // Adjust threshold as needed
        });
        break;
      default:
        return data; // Return all data if no tab is active
    }

    // Sort filtered data by Count in descending order
    return filteredData.sort((a, b) => Number(b["Count"]) - Number(a["Count"]));
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
          onClick={() => setActiveTab(null)} // Reset active tab to show all data
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
