"use client";

import DataTable from "@/components/DataTable";
import useAnalyze from "@/hooks/useAnalyze";

const UnknownData = () => {
  const { unknownData } = useAnalyze();

  return <DataTable data={unknownData} />;
};

export default UnknownData;
