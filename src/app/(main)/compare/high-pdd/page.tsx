"use client";

import DataTable from "@/components/DataTable";
import useCompare from "@/hooks/useCompare";

const HighPDDData = () => {
  const { highPDDComparison } = useCompare();

  return <DataTable data={highPDDComparison} />;
};

export default HighPDDData;
