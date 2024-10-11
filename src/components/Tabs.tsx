import { useEffect, useState } from "react";
import DataTable from "./DataTable";

interface DataItem {
  [key: string]: string | number;
}

interface TabsProps {
  data: DataItem[];
}

const Tabs: React.FC<TabsProps> = ({ data }) => {
  const [activeTab, setActiveTab] = useState<string | null>(null);
  const [filteredData, setFilteredData] = useState<DataItem[]>([]);

  useEffect(() => {
    if (data.length > 0) {
      setActiveTab("unknown"); // Set default active tab
    }
  }, [data]);

  // Function to handle unknown data filtering
  const handleUnknownData = () => {
    const unknownData = data
      .filter(
        (item) =>
          typeof item.Operator === "string" &&
          item.Operator.toLowerCase() === "unknown"
      )
      .sort((a, b) => (b.Count as number) - (a.Count as number));

    setFilteredData(unknownData);
    setActiveTab("unknown");
  };

  // Function to handle low ACD filtering with additional Count > 50 logic
  const handleLowAcdData = () => {
    const keywordValues: { [key: string]: number } = {
      CC: 0.05,
      STD: 2,
      NCLI: 2,
      PREM: 1.5,
      CLI: 1.5,
    };

    const lowAcdData = data
      .filter((item) => {
        const originator = item.Originator as string;
        const acdValue = item.ACD as number;
        const countValue = item.Count as number;

        // Check for keywords in Originator and compare ACD value
        for (const [keyword, threshold] of Object.entries(keywordValues)) {
          if (
            originator.includes(keyword) &&
            acdValue < threshold &&
            countValue > 50
          ) {
            return true; // It's considered low ACD and Count > 50
          }
        }
        return false; // Not low ACD or Count <= 50
      })
      // Sort the filtered data by Count in descending order
      .sort((a, b) => (b.Count as number) - (a.Count as number));

    setFilteredData(lowAcdData);
    setActiveTab("low_acd");
  };

  // List of tab names
  const tabNames = ["unknown", "low_acd"];

  return (
    <section>
      <div className="flex justify-center space-x-4 mb-4">
        {tabNames.map((tab) => (
          <button
            key={tab}
            onClick={tab === "unknown" ? handleUnknownData : handleLowAcdData}
            className={`px-4 py-2 rounded ${
              activeTab === tab ? "bg-indigo-700" : "bg-indigo-600"
            } text-white hover:bg-indigo-500 transition`}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1).replace("_", " ")}
          </button>
        ))}
      </div>

      {activeTab && <DataTable data={filteredData} />}
    </section>
  );
};

export default Tabs;
