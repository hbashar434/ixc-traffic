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

        for (const [keyword, threshold] of Object.entries(keywordValues)) {
          if (
            originator.includes(keyword) &&
            acdValue < threshold &&
            countValue > 50
          ) {
            return true; // It's considered low ACD and Count > 50
          }
        }
        return false;
      })
      .sort((a, b) => (b.Count as number) - (a.Count as number));

    setFilteredData(lowAcdData);
    setActiveTab("low_acd");
  };

  // Function to handle 0 ACD/ASR filtering and sorting by Count
  const handleZeroAcdAsrData = () => {
    const zeroAcdAsrData = data
      .filter((item) => item.ACD === 0 || item.ASR === 0)
      .sort((a, b) => (b.Count as number) - (a.Count as number));

    setFilteredData(zeroAcdAsrData);
    setActiveTab("zero_acd_asr");
  };

  // Function to handle low ASR filtering and sorting by Count
  const handleLowAsrData = () => {
    const lowAsrData = data
      .filter(
        (item) => (item.ASR as number) < 0.1 && (item.Count as number) > 50
      )
      .sort((a, b) => (b.Count as number) - (a.Count as number));

    setFilteredData(lowAsrData);
    setActiveTab("low_asr");
  };

  // Function to handle high PDD filtering and sorting by Count
  const handleHighPddData = () => {
    const highPddData = data
      .filter(
        (item) => (item.PDD as number) > 10 && (item.Count as number) > 50
      )
      .sort((a, b) => (b.Count as number) - (a.Count as number));

    setFilteredData(highPddData);
    setActiveTab("high_pdd");
  };

  // List of tab names
  const tabNames = [
    "unknown",
    "low_acd",
    "low_asr",
    "high_pdd",
    "zero_acd_asr",
  ];

  return (
    <section>
      <div className="flex justify-center space-x-4 mb-4">
        {tabNames.map((tab) => (
          <button
            key={tab}
            onClick={
              tab === "unknown"
                ? handleUnknownData
                : tab === "low_acd"
                ? handleLowAcdData
                : tab === "zero_acd_asr"
                ? handleZeroAcdAsrData
                : tab === "low_asr"
                ? handleLowAsrData
                : handleHighPddData // Handle "HIGH PDD" tab
            }
            className={`px-4 py-2 rounded ${
              activeTab === tab ? "bg-indigo-700" : "bg-indigo-600"
            } text-white hover:bg-indigo-500 transition`}
          >
            {tab.replace("_", " ").toUpperCase()}
          </button>
        ))}
      </div>

      {activeTab && <DataTable data={filteredData} />}
    </section>
  );
};

export default Tabs;
