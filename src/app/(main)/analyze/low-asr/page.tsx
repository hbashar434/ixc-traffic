"use client";

import DataTable from "@/components/DataTable";
import useAnalyze from "@/hooks/useAnalyze";

const LowASRData = () => {
  const { lowASRData } = useAnalyze();

  return <DataTable data={lowASRData} />;
};

export default LowASRData;
