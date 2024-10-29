"use client";

import DataTable from "@/components/DataTable";
import useAnalyze from "@/hooks/useAnalyze";

const ZeroASRACD = () => {
  const { zeroASRACDData } = useAnalyze();

  return <DataTable data={zeroASRACDData} />;
};

export default ZeroASRACD;
