import { useEffect, useState } from "react";

interface DataItem {
  Operator?: string;
  ACD?: number;
  ASR?: number;
  PDD?: number;
  Originator?: string;
  Count?: number;
  Code?: string;
  Country?: string;
  Results?: string;
  [key: string]: any;
}

interface ComparisonResult {
  unknownComparison: DataItem[];
  zeroASRACDComparison: DataItem[];
  lowACDComparison: DataItem[];
  lowASRComparison: DataItem[];
  highPDDComparison: DataItem[];
}

const useCompare = (): ComparisonResult => {
  const [comparisonData, setComparisonData] = useState<ComparisonResult>({
    unknownComparison: [],
    zeroASRACDComparison: [],
    lowACDComparison: [],
    lowASRComparison: [],
    highPDDComparison: [],
  });

  useEffect(() => {
    const fetchAndCompareData = () => {
      const oldDataRaw = localStorage.getItem("ixcOldFile");
      const newDataRaw = localStorage.getItem("ixcNewFile");

      if (!oldDataRaw || !newDataRaw) {
        console.error("One or both data files are missing in local storage.");
        return;
      }

      const oldData: DataItem[] = JSON.parse(oldDataRaw);
      const newData: DataItem[] = JSON.parse(newDataRaw);

      // Helper function for comparing values
      const compareValue = (newVal: number, oldVal: number) => {
        return newVal > oldVal
          ? `Increase (${newVal - oldVal})`
          : newVal < oldVal
          ? `Decrease (${oldVal - newVal})`
          : "Same (0)";
      };

      // Dynamic comparison function
      const performComparison = (
        filterCondition: (newRow: DataItem) => boolean,
        metricKey?: keyof DataItem
      ) => {
        return newData
          .filter(filterCondition)
          .map((newRow) => {
            const oldRow = oldData.find(
              (old) =>
                old.Code === newRow.Code &&
                old.Originator === newRow.Originator &&
                old.Operator === newRow.Operator &&
                old.Country === newRow.Country
            );

            // Check if we need to compare a specific metric or just the count
            const result =
              oldRow && metricKey
                ? compareValue(
                    newRow[metricKey] as number,
                    oldRow[metricKey] as number
                  )
                : oldRow
                ? compareValue(newRow.Count as number, oldRow.Count as number)
                : "New";

            return {
              ...newRow,
              Results: result,
            };
          })
          .sort((a, b) => (b.Count || 0) - (a.Count || 0)); // Sort high to low
      };

      const unknownComparison = performComparison(
        (newRow) => newRow.Operator?.toLowerCase() === "unknown"
      );

      const zeroASRACDComparison = performComparison(
        (newRow) => newRow.ACD === 0 || newRow.ASR === 0
      );

      const lowACDComparison = performComparison(() => true, "ACD");

      const lowASRComparison = performComparison(() => true, "ASR");

      const highPDDComparison = performComparison(() => true, "PDD");

      setComparisonData({
        unknownComparison,
        zeroASRACDComparison,
        lowACDComparison,
        lowASRComparison,
        highPDDComparison,
      });
    };

    fetchAndCompareData();
  }, []);

  return comparisonData;
};

export default useCompare;
