import dbConnect from "@/lib/dbConnect";
import RawData, { IRawData } from "@/model/rawData/rawData";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function postRawDataHandler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await dbConnect();

  if (req.method === "POST") {
    try {
      const rawDataEntry: IRawData = req.body;

      const rawData = new RawData(rawDataEntry);
      await rawData.save();

      res
        .status(201)
        .json({ message: "Data inserted successfully", data: rawData });
    } catch (error) {
      console.error("Error inserting data:", error);
      res.status(500).json({ error: "Failed to insert data" });
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
