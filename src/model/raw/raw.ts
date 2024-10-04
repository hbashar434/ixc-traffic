import mongoose, { Document, Model, Schema } from "mongoose";

export interface IRawData extends Document {
  [key: string]: any;
}

const RawDataSchema: Schema = new Schema({}, { strict: false });

const RawData: Model<IRawData> =
  mongoose.models.rawData || mongoose.model<IRawData>("rawData", RawDataSchema);

export default RawData;
