"use client";

import { useState, useEffect, ChangeEvent } from "react";
import * as XLSX from "xlsx";
import { countryCodes } from "@/utils/constant";
import DataTable from "./DataTable";

interface FileData {
  [key: string]: string | number;
}

const FileUpload: React.FC = () => {
  const [newFileData, setNewFileData] = useState<FileData[] | null>(null);
  const [error, setError] = useState<string>("");
  const [showTable, setShowTable] = useState<boolean>(false);
  const [fileName, setFileName] = useState<string>("");

  useEffect(() => {
    const storedNewFileData = localStorage.getItem("ixcNewFile");
    if (storedNewFileData) {
      setNewFileData(JSON.parse(storedNewFileData));
    }
  }, []);

  const handleFileUpload = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const fileType = file.type;
      setError("");
      setFileName(file.name);

      if (
        fileType ===
          "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" ||
        fileType === "application/vnd.ms-excel"
      ) {
        const reader = new FileReader();
        reader.onload = (e) => {
          const data = new Uint8Array(e.target?.result as ArrayBuffer);
          const workbook = XLSX.read(data, { type: "array" });
          const sheetName = workbook.SheetNames[0];
          const worksheet = workbook.Sheets[sheetName];
          const jsonData = XLSX.utils.sheet_to_json(worksheet);
          jsonData.pop(); // Remove any extra rows (like totals)

          const processedData = (jsonData as FileData[]).map((row) => {
            delete row["#"];
            const country = ((row["Country"] as string) || "")
              .trim()
              .split(" ")[0]
              .toLowerCase();
            const countryCodeKey = Object.keys(countryCodes).find(
              (key) => key.toLowerCase().split(" ")[0] === country
            );

            if (countryCodeKey) {
              row["Code"] = countryCodes[countryCodeKey];
            } else {
              row["Code"] = "False";
            }

            return {
              Code: row["Code"],
              ...row,
            };
          });

          if (newFileData) {
            localStorage.setItem("ixcOldFile", JSON.stringify(newFileData));
          }

          setNewFileData(processedData);
          localStorage.setItem("ixcNewFile", JSON.stringify(processedData));
        };

        reader.readAsArrayBuffer(file);
      } else {
        setError("Unsupported file type. Please upload an Excel file.");
      }
    }
  };

  const handleAnalyzeClick = () => {
    if (newFileData) {
      setShowTable(true);
    } else {
      setError("Please upload a file before analyzing.");
    }
  };

  return (
    <div className="relative flex justify-center items-center p-6">
      <div className="flex flex-col items-center w-full max-w-lg">
        {/* File Upload Section */}
        <label
          htmlFor="dropzone-file"
          className="flex flex-col items-center w-full p-5 mt-2 text-center bg-white border-2 border-gray-300 border-dashed cursor-pointer rounded-xl h-32"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="w-8 h-8 text-gray-500"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M12 16.5V9.75m0 0l3 3m-3-3l-3 3M6.75 19.5a4.5 4.5 0 01-1.41-8.775 5.25 5.25 0 0110.233-2.33 3 3 0 013.758 3.848A3.752 3.752 0 0118 19.5H6.75z"
            />
          </svg>

          {fileName ? (
            <h2 className="mt-1 font-medium tracking-wide text-gray-700">
              {fileName}
            </h2>
          ) : (
            <h2 className="mt-1 font-medium tracking-wide text-gray-700">
              Data File
            </h2>
          )}

          {!fileName && (
            <p className="mt-2 text-xs tracking-wide text-gray-500">
              Upload or drag & drop your Excel file (.xlsx or .xls).
            </p>
          )}

          <input
            id="dropzone-file"
            type="file"
            accept=".xlsx, .xls"
            onChange={handleFileUpload}
            className="hidden"
          />
        </label>

        {/* Analyze Button */}
        <button
          onClick={handleAnalyzeClick}
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 flex items-center justify-center w-full max-w-lg"
        >
          Analyze
        </button>

        {/* Error Message */}
        {error && (
          <div className="mt-2 text-red-500 text-center">
            <p>{error}</p>
          </div>
        )}

        {/* Data Table */}
        {showTable && newFileData && <DataTable data={newFileData} />}
      </div>

      {/* Buttons aligned to the right-center with absolute positioning, column-wise */}
      <div className="absolute top-1/2 right-0 transform -translate-y-1/2 flex flex-col space-y-4">
        <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
          Old File
        </button>
        <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
          Latest File
        </button>
      </div>
    </div>
  );
};

export default FileUpload;
