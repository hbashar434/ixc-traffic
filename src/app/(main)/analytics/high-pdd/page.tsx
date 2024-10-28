"use client";

import DataTable from "@/components/DataTable";
import useAnalytics from "@/hooks/useAnalytics";

const HighPDDData = () => {
  const { highPDDData } = useAnalytics();

  return <DataTable data={highPDDData} />;
};

export default HighPDDData;
