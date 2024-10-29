"use client";

import DataTable from "@/components/DataTable";
import useCompare from "@/hooks/useCompare";

const ZeroASRACD = () => {
  const { zeroASRACDComparison } = useCompare();

  return <DataTable data={zeroASRACDComparison} />;
};

export default ZeroASRACD;
