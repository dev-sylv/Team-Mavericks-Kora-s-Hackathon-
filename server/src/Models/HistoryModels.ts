import { Schema, model } from "mongoose";

import { HistoryDetails } from "../AllInterfaces/Interfaces";

const HistorySchema: Schema<HistoryDetails> = new Schema(
  {
    owner: {
      type: String,
    },
    message: {
      type: String,
    },
    transactionReference: {
      type: String,
    },
    transactionType: {
      type: String,
    },
    dateTime: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const HistoryModels = model<HistoryDetails>("Histories", HistorySchema);

export default HistoryModels;
