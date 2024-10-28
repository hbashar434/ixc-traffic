"use client";

import DataTable from "@/components/DataTable";
import useAnalytics from "@/hooks/useAnalytics";

const LowACDData = () => {
  const { lowACDData } = useAnalytics();

  return <DataTable data={lowACDData} />;
};

export default LowACDData;
