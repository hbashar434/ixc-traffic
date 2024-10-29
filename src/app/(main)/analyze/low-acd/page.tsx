"use client";

import DataTable from "@/components/DataTable";
import useAnalyze from "@/hooks/useAnalyze";

const LowACDData = () => {
  const { lowACDData } = useAnalyze();

  return <DataTable data={lowACDData} />;
};

export default LowACDData;
