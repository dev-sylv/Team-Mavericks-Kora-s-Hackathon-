import { Schema, model } from "mongoose";

import { GiftCardDetails } from "../AllInterfaces/Interfaces";

const GiftCardSchema: Schema<GiftCardDetails> = new Schema(
  {
    name: {
      type: String,
    },
    BrandLogo: {
      type: String,
    },
    uniqueID: {
      type: String,
    },
    colour: {
      type: String,
    },
    dateTime: {
      type: String,
    },
    moneyWorth: {
      type: Number,
      required: [true, "Please enter the money worth of card"],
    },
  },
  {
    timestamps: true,
  }
);

const GiftCardModels = model<GiftCardDetails>("GiftCards", GiftCardSchema);

export default GiftCardModels;
