"use client";

import DataTable from "@/components/DataTable";
import useCompare from "@/hooks/useCompare";

const LowACDData = () => {
  const { lowACDComparison } = useCompare();

  return <DataTable data={lowACDComparison} />;
};

export default LowACDData;
