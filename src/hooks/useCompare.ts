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

      // Comparison helper to avoid repeating logic
      const compareValue = (newVal: number, oldVal: number) => {
        return newVal > oldVal
          ? `Increase (${newVal - oldVal})`
          : newVal < oldVal
          ? `Decrease (${oldVal - newVal})`
          : "Same (0)";
      };

      // Comparison without thresholds
      const unknownComparison = newData
        .filter((item) => item.Operator?.toLowerCase() === "unknown")
        .map((newRow) => {
          const oldRow = oldData.find(
            (old) =>
              old.Code === newRow.Code &&
              old.Originator === newRow.Originator &&
              old.Operator === newRow.Operator &&
              old.Country === newRow.Country
          );
          return {
            ...newRow,
            CountRes: oldRow
              ? compareValue(newRow.Count as number, oldRow.Count as number)
              : "New",
          };
        })
        .sort((a, b) => (b.Count || 0) - (a.Count || 0)); // Sort high to low

      const zeroASRACDComparison = newData
        .filter((item) => item.ACD === 0 || item.ASR === 0)
        .map((newRow) => {
          const oldRow = oldData.find(
            (old) =>
              old.Code === newRow.Code &&
              old.Originator === newRow.Originator &&
              old.Operator === newRow.Operator &&
              old.Country === newRow.Country
          );
          return {
            ...newRow,
            CountRes: oldRow
              ? compareValue(newRow.Count as number, oldRow.Count as number)
              : "New",
          };
        })
        .sort((a, b) => (b.Count || 0) - (a.Count || 0)); // Sort high to low

      const lowACDComparison = newData
        .map((newRow) => {
          const oldRow = oldData.find(
            (old) =>
              old.Code === newRow.Code &&
              old.Originator === newRow.Originator &&
              old.Operator === newRow.Operator &&
              old.Country === newRow.Country
          );
          return {
            ...newRow,
            CountRes: oldRow
              ? compareValue(newRow.Count as number, oldRow.Count as number)
              : "New",
          };
        })
        .sort((a, b) => (b.Count || 0) - (a.Count || 0)); // Sort high to low

      const lowASRComparison = newData
        .map((newRow) => {
          const oldRow = oldData.find(
            (old) =>
              old.Code === newRow.Code &&
              old.Originator === newRow.Originator &&
              old.Operator === newRow.Operator &&
              old.Country === newRow.Country
          );
          return {
            ...newRow,
            CountRes: oldRow
              ? compareValue(newRow.Count as number, oldRow.Count as number)
              : "New",
          };
        })
        .sort((a, b) => (b.Count || 0) - (a.Count || 0)); // Sort high to low

      const highPDDComparison = newData
        .map((newRow) => {
          const oldRow = oldData.find(
            (old) =>
              old.Code === newRow.Code &&
              old.Originator === newRow.Originator &&
              old.Operator === newRow.Operator &&
              old.Country === newRow.Country
          );
          return {
            ...newRow,
            CountRes: oldRow
              ? compareValue(newRow.Count as number, oldRow.Count as number)
              : "New",
          };
        })
        .sort((a, b) => (b.Count || 0) - (a.Count || 0)); // Sort high to low

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
