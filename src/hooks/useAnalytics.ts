import { useEffect, useState } from "react";

interface DataItem {
  Operator?: string;
  ACD?: number;
  ASR?: number;
  PDD?: number;
  Originator?: string;
  Count?: number;
  [key: string]: any;
}

interface AnalyticsData {
  unknownData: DataItem[];
  zeroASRACDData: DataItem[];
  lowACDData: DataItem[];
  lowASRData: DataItem[];
  highPDDData: DataItem[];
}

const useAnalytics = (): AnalyticsData => {
  const [analyticsData, setAnalyticsData] = useState<AnalyticsData>({
    unknownData: [],
    zeroASRACDData: [],
    lowACDData: [],
    lowASRData: [],
    highPDDData: [],
  });

  useEffect(() => {
    const fetchDataFromStorage = () => {
      const rawData = localStorage.getItem("ixcNewFile");
      if (!rawData) return;

      const data: DataItem[] = JSON.parse(rawData);

      const unknownData = data
        .filter(
          (item) =>
            typeof item.Operator === "string" &&
            item.Operator.toLowerCase() === "unknown"
        )
        .sort((a, b) => (b.Count ?? 0) - (a.Count ?? 0));

      const zeroASRACDData = data
        .filter((item) => item.ACD === 0 || item.ASR === 0)
        .sort((a, b) => (b.Count ?? 0) - (a.Count ?? 0));

      const lowACDData = data
        .filter((item) => {
          const keywordValues: { [key: string]: number } = {
            CC: 0.05,
            STD: 2,
            NCLI: 2,
            PREM: 1.5,
            CLI: 1.5,
          };
          const originator = item.Originator || "";
          const acdValue = item.ACD ?? Infinity;
          const countValue = item.Count ?? 0;

          return Object.entries(keywordValues).some(
            ([keyword, threshold]) =>
              originator.includes(keyword) &&
              acdValue < threshold &&
              countValue > 50
          );
        })
        .sort((a, b) => (b.Count ?? 0) - (a.Count ?? 0));

      const lowASRData = data
        .filter((item) => (item.ASR ?? 0) < 0.1 && (item.Count ?? 0) > 50)
        .sort((a, b) => (b.Count ?? 0) - (a.Count ?? 0));

      const highPDDData = data
        .filter((item) => (item.PDD ?? 0) > 10 && (item.Count ?? 0) > 50)
        .sort((a, b) => (b.Count ?? 0) - (a.Count ?? 0));

      setAnalyticsData({
        unknownData,
        zeroASRACDData,
        lowACDData,
        lowASRData,
        highPDDData,
      });
    };

    fetchDataFromStorage();
  }, []);

  return analyticsData;
};

export default useAnalytics;
