"use client";

import DataTable from "@/components/DataTable";
import useCompare from "@/hooks/useCompare";

const LowASRData = () => {
  const { lowACDComparison } = useCompare();

  return <DataTable data={lowACDComparison} />;
};

export default LowASRData;
