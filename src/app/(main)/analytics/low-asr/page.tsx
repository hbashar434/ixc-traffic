"use client";

import DataTable from "@/components/DataTable";
import useAnalytics from "@/hooks/useAnalytics";

const LowASRData = () => {
  const { lowASRData } = useAnalytics();

  return <DataTable data={lowASRData} />;
};

export default LowASRData;
