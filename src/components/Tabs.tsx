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

  // List of tab names
  const tabs = ["unknown", "low-acd", "low-asr", "high-pdd"];

  return (
    <section className="p-4">
      {/* Center the Tab Buttons */}
      <div className="mb-4 flex justify-center space-x-4">
        {tabs.map((tab) => (
          <button
            key={tab}
            className={`px-4 py-2 rounded ${
              activeTab === tab
                ? "bg-blue-500 text-white"
                : "bg-gray-200 text-black"
            } hover:bg-blue-600 hover:text-white transition`}
            onClick={() => setActiveTab(tab)}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1).replace("-", " ")}
          </button>
        ))}
      </div>

      {/* Display filtered data */}
      <div>{activeTab && <DataTable data={data} />}</div>
    </section>
  );
};

export default Tabs;
