import { useState } from "react";
import DataTable from "./DataTable";

interface DataItem {
  [key: string]: string | number;
}

interface TabsProps {
  data: DataItem[];
}

const Tabs: React.FC<TabsProps> = ({ data }) => {
  const [activeTab, setActiveTab] = useState<string | null>(null);

  return (
    <section>
      {/* Tab Buttons */}
      <div>
        <button onClick={() => setActiveTab("unknown")}>Unknown</button>
        <button onClick={() => setActiveTab("low-acd")}>Low ACD</button>
        <button onClick={() => setActiveTab("low-asr")}>Low ASR</button>
        <button onClick={() => setActiveTab("high-pdd")}>High PDD</button>
      </div>

      {/* Display filtered data */}
      <div>{activeTab && <DataTable data={data} />}</div>
    </section>
  );
};

export default Tabs;
