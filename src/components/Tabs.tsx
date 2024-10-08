import { useEffect, useState } from "react";
import DataTable from "./DataTable";

interface DataItem {
  [key: string]: string | number;
}

interface TabsProps {
  data: DataItem[];
}

const Tabs: React.FC<TabsProps> = ({ data }) => {
  const [activeTab, setActiveTab] = useState<string | null>(null);

  useEffect(() => {
    if (data.length > 0) {
      setActiveTab("tabs");
    }
  }, [data]);

  return <section>{activeTab && <DataTable data={data} />}</section>;
};

export default Tabs;
