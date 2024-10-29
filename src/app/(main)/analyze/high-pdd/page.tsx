"use client";

import DataTable from "@/components/DataTable";
import useAnalyze from "@/hooks/useAnalyze";

const HighPDDData = () => {
  const { highPDDData } = useAnalyze();

  return <DataTable data={highPDDData} />;
};

export default HighPDDData;
