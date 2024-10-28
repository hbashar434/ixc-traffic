"use client";

import DataTable from "@/components/DataTable";
import useAnalytics from "@/hooks/useAnalytics";

const UnknownData = () => {
  const { unknownData } = useAnalytics();

  return <DataTable data={unknownData} />;
};

export default UnknownData;
