import { Schema, model } from "mongoose";

import { HistoryDetails } from "../AllInterfaces/Interfaces";

const HistorySchema: Schema<HistoryDetails> = new Schema(
  {
    message: {
      type: String,
    },
    transactionReference: {
      type: Number,
    },
    transactionType: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const HistoryModels = model<HistoryDetails>("Histories", HistorySchema);

export default HistoryModels;
