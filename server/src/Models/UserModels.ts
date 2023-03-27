import mongoose, { Schema, model } from "mongoose";

import { UserDetails } from "../AllInterfaces/Interfaces";

import isEmail from "validator/lib/isEmail";

const UserSchema: Schema<UserDetails> = new Schema(
  {
    name: {
      type: String,
      required: [true, "Please enter your name"],
    },
    email: {
      type: String,
      required: [true, "Please enter your email"],
      unique: true,
      lowercase: true,
      trim: true,
      validate: [isEmail, "Please enter a valid email"],
    },
    image: {
      type: String,
    },
    username: {
      type: String,
      required: [true, "Please enter a suitable username"],
    },
    phoneNumber: {
      type: Number,
    },
    password: {
      type: String,
      required: [true, "Please enter your Password"],
    },
    confirmPassword: {
      type: String,
      required: [true, "Please confirm your password"],
    },
    dateTime: {
      type: String,
    },
    status: {
      type: String,
      required: [true, "Please enter your status"],
      message: "You must either be a User or for Business",
      enum: ["User", "Business"],
      default: "User",
    },
    TransactionHistory: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Histories",
      },
    ],
    companyGiftCards: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "GiftCards",
      },
    ],
    PurchasedGiftCards: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "GiftCards",
      },
    ],
  },
  {
    timestamps: true,
  }
);

const UserModels = model<UserDetails>("Users", UserSchema);

export default UserModels;
