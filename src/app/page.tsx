"use client";
import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import FileUpload from "@/components/FileUpload";
import Tabs from "@/components/Tabs";

const HomePage = () => {
  const [fileData, setFileData] = useState<any[]>([]);

  useEffect(() => {
    const storedData = localStorage.getItem("fileData");
    if (storedData) {
      setFileData(JSON.parse(storedData));
    }
  }, []);

  return (
    <section>
      <Navbar />
      <FileUpload />
      {fileData.length > 0 && (
        <div className="mt-6">
          <Tabs data={fileData} />
        </div>
      )}
    </section>
  );
};

export default HomePage;
