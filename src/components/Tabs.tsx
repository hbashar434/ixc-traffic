import React, { useState } from "react";
import DataTable from "./DataTable";

interface Tab {
  label: string;
  key: string;
}

interface TabsProps {
  tabs: Tab[];
  getData: (key: string) => any[];
}

const Tabs: React.FC<TabsProps> = ({ tabs, getData }) => {
  const [activeTab, setActiveTab] = useState<number>(0);

  return (
    <div>
      <div className="flex space-x-4 border-b">
        {tabs.map((tab, index) => (
          <button
            key={tab.key}
            className={`py-2 px-4 focus:outline-none ${
              activeTab === index
                ? "border-b-2 border-blue-500 font-semibold"
                : "text-gray-500"
            }`}
            onClick={() => setActiveTab(index)}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className="mt-4">
        <DataTable data={getData(tabs[activeTab].key)} />{" "}
      </div>
    </div>
  );
};

export default Tabs;
