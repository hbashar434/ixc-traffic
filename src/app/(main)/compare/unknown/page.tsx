"use client";

import DataTable from "@/components/DataTable";
import useCompare from "@/hooks/useCompare";

const UnknownData = () => {
  const { unknownComparison } = useCompare();
  console.log({ unknownComparison });

  return <DataTable data={unknownComparison} />;
};

export default UnknownData;
