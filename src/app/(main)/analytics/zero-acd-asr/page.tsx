"use client";

import DataTable from "@/components/DataTable";
import useAnalytics from "@/hooks/useAnalytics";

const ZeroASRACD = () => {
  const { zeroASRACDData } = useAnalytics();

  return <DataTable data={zeroASRACDData} />;
};

export default ZeroASRACD;
