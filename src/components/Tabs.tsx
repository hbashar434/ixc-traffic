import { useState, useEffect } from "react";
import DataTable from "./DataTable";

interface DataItem {
  [key: string]: string | number;
}

interface TabsProps {
  data: DataItem[];
}

const TabsWithComparison: React.FC<TabsProps> = ({ data }) => {
  const [activeTab, setActiveTab] = useState<string | null>(null);
  const [filteredData, setFilteredData] = useState<DataItem[]>([]);
  const [comparisonResults, setComparisonResults] = useState<DataItem[]>([]);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    if (data.length > 0) {
      setActiveTab("unknown"); // Set default active tab
    }
  }, [data]);

  // Tab filtering functions (same as your previous code)
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

  const handleZeroAcdAsrData = () => {
    const zeroAcdAsrData = data
      .filter((item) => item.ACD === 0 || item.ASR === 0)
      .sort((a, b) => (b.Count as number) - (a.Count as number));

    setFilteredData(zeroAcdAsrData);
    setActiveTab("zero_acd_asr");
  };

  const handleLowAsrData = () => {
    const lowAsrData = data
      .filter(
        (item) => (item.ASR as number) < 0.1 && (item.Count as number) > 50
      )
      .sort((a, b) => (b.Count as number) - (a.Count as number));

    setFilteredData(lowAsrData);
    setActiveTab("low_asr");
  };

  const handleHighPddData = () => {
    const highPddData = data
      .filter(
        (item) => (item.PDD as number) > 10 && (item.Count as number) > 50
      )
      .sort((a, b) => (b.Count as number) - (a.Count as number));

    setFilteredData(highPddData);
    setActiveTab("high_pdd");
  };

  // Function to handle file comparison
  const oldFileData = localStorage.getItem("ixcOldFile");
  const newFileData = localStorage.getItem("ixcNewFile");

  const handleCompareFiles = () => {
    if (!oldFileData || !newFileData) {
      setError("Both old and new files need to be uploaded before comparison.");
      return;
    }

    setError(""); // Clear previous error messages
    const oldData: DataItem[] = JSON.parse(oldFileData);
    const newData: DataItem[] = JSON.parse(newFileData);

    const comparisonResults = newData.map((newRow) => {
      const matchingOldRow = oldData.find(
        (oldRow) =>
          oldRow.Code === newRow.Code &&
          oldRow.Originator === newRow.Originator &&
          oldRow.Operator === newRow.Operator &&
          oldRow.Country === newRow.Country
      );

      if (matchingOldRow) {
        // Comparison logic
        const compareValue = (newVal: number, oldVal: number) => {
          const diff = newVal - oldVal;
          return diff > 0
            ? `Increase (${diff})`
            : diff < 0
            ? `Decrease (${Math.abs(diff)})`
            : "Same";
        };

        const compareWithoutValue = (newVal: number, oldVal: number) => {
          return newVal > oldVal
            ? "Increase"
            : newVal < oldVal
            ? "Decrease"
            : "Same";
        };

        return {
          ...newRow,
          "Minute Res": compareWithoutValue(
            newRow["Minute dur"] as number,
            matchingOldRow["Minute dur"] as number
          ),
          "Count Res": compareValue(
            newRow.Count as number,
            matchingOldRow.Count as number
          ), // Only Count shows value
          "ACD Res": compareWithoutValue(
            newRow.ACD as number,
            matchingOldRow.ACD as number
          ),
          "ASR Res": compareWithoutValue(
            newRow.ASR as number,
            matchingOldRow.ASR as number
          ),
          "PDD Res": compareWithoutValue(
            newRow.PDD as number,
            matchingOldRow.PDD as number
          ),
        };
      } else {
        return {
          ...newRow,
          "Minute Res": "New",
          "Count Res": "New",
          "ACD Res": "New",
          "ASR Res": "New",
          "PDD Res": "New",
        };
      }
    });

    setComparisonResults(comparisonResults);
  };

  // Tabs logic remains unchanged
  const tabNames = [
    "unknown",
    "low_acd",
    "low_asr",
    "high_pdd",
    "zero_acd_asr",
  ];

  return (
    <section>
      {/* Compare Files Button */}
      {oldFileData && newFileData && (
        <button
          onClick={handleCompareFiles}
          className="mb-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 flex flex-col items-center w-full max-w-lg mx-auto text-center"
        >
          Compare With Previous Data
        </button>
      )}
      {/* Tabs */}
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
              activeTab === tab ? "bg-blue-600" : "bg-blue-500"
            } text-white hover:bg-blue-600 transition`}
          >
            {tab.replace("_", " ").toUpperCase()}
          </button>
        ))}
      </div>

      {error && (
        <div className="mt-2 text-red-500 flex flex-col items-center w-full max-w-lg mx-auto text-center">
          <p>{error}</p>
        </div>
      )}

      {/* Show filtered data when a tab is active */}
      {activeTab && filteredData.length > 0 && (
        <DataTable data={filteredData} />
      )}

      {/* Show comparison results */}
      {comparisonResults.length > 0 && <DataTable data={comparisonResults} />}
    </section>
  );
};

export default TabsWithComparison;
