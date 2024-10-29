"use client";

import DataTable from "@/components/DataTable";
import useCompare from "@/hooks/useCompare";

const LowASRData = () => {
  const { lowASRComparison } = useCompare();

  return <DataTable data={lowASRComparison} />;
};

export default LowASRData;
