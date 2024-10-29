"use client";

import DataTable from "@/components/DataTable";
import useCompare from "@/hooks/useCompare";


const ZeroASRACD = () => {
  const { zeroASRACDData } = useCompare();

  return <DataTable data={zeroASRACDData} />;
};

export default ZeroASRACD;
