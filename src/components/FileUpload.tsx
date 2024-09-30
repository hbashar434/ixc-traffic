"use client";

import { useState, ChangeEvent } from "react";
import * as XLSX from "xlsx";
import { countryCodes } from "@/utils/constant";
import DataTable from "./DataTable";

interface FileData {
  [key: string]: string | number;
}

const FileUpload: React.FC = () => {
  const [fileData, setFileData] = useState<FileData[] | null>(null);
  const [error, setError] = useState<string>("");
  const [showTable, setShowTable] = useState<boolean>(false);
  const [fileName, setFileName] = useState<string>("");

  const handleFileUpload = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (file) {
      const fileType = file.type;
      setError("");
      setFileData(null);
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

          // Remove the last row if it is empty
          jsonData.pop();

          // Process the file data and normalize country names
          const processedData = (jsonData as FileData[]).map((row) => {
            const country = ((row["Country"] as string) || "")
              .trim()
              .split(" ")[0]
              .toLowerCase(); // Take the first word and make it lowercase

            // Match the country code by ignoring case sensitivity
            const countryCodeKey = Object.keys(countryCodes).find(
              (key) => key.toLowerCase().split(" ")[0] === country
            );

            if (countryCodeKey) {
              row["Country Code"] = countryCodes[countryCodeKey];
            } else {
              row["Country Code"] = "Unknown"; // Handle unmatched countries
            }

            return row;
          });

          setFileData(processedData);
        };

        reader.readAsArrayBuffer(file);
      } else {
        setError("Unsupported file type. Please upload an Excel file.");
      }
    }
  };

  const handleAnalyzeClick = () => {
    if (fileData) {
      setShowTable(true);
    } else {
      setError("Please upload a file before analyzing.");
    }
  };

  return (
    <div className="p-6">
      <label
        htmlFor="dropzone-file"
        className="flex flex-col items-center w-full max-w-lg p-5 mx-auto mt-2 text-center bg-white border-2 border-gray-300 border-dashed cursor-pointer rounded-xl h-32"
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

      <button
        onClick={handleAnalyzeClick}
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 flex flex-col items-center w-full max-w-lg mx-auto text-center"
      >
        Analyze
      </button>

      {error && (
        <div className="mt-2 text-red-500 flex flex-col items-center w-full max-w-lg mx-auto text-center">
          <p>{error}</p>
        </div>
      )}

      {showTable && fileData && <DataTable data={fileData} />}
    </div>
  );
};

export default FileUpload;
