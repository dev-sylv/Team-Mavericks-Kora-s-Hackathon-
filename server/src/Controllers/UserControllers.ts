import { NextFunction, Request, Response } from "express";
import UserModels from "../Models/UserModels";
import { AsyncHandler } from "../Utils/AsyncHandler";
import Cloud from "../Config/cloudinary";
import bcrypt from "bcrypt";
import { AppError, HTTPCODES } from "../Utils/AppError";
import BusinessModels from "../Models/BusinessModels";
import HistoryModels from "../Models/HistoryModels";
import { uuid } from "uuidv4";
import mongoose from "mongoose";
import GiftCardModels from "../Models/GiftCardModels";
import crypto from "crypto";
import axios from "axios";
import { EnvironmentVariables } from "../Config/EnvironmentVariables";

// My secret key from Kora dashboard
const secret = EnvironmentVariables.Kora_secret_key;

// Encrypted Key from Kora dashboard
const encrypt = EnvironmentVariables.Encrypted_key;

// Kora's API that we'll be hiiting on to do pay ins (zenith bank to wallet)
const urlData = "https://api.korapay.com/merchant/api/v1/charges/card";

// Function to encrypt the payment that will be coming in
function encryptAES256(encryptionKey: string, paymentData: any) {
  const iv = crypto.randomBytes(16);

  const cipher = crypto.createCipheriv("aes-256-gcm", encryptionKey, iv);
  const encrypted = cipher.update(paymentData);

  const ivToHex = iv.toString("hex");
  const encryptedToHex = Buffer.concat([encrypted, cipher.final()]).toString(
    "hex"
  );

  return `${ivToHex}:${encryptedToHex}:${cipher.getAuthTag().toString("hex")}`;
}

// Users Registration:
export const UsersRegistration = AsyncHandler(
  async (req: any, res: Response, next: NextFunction) => {
    const { name, email, phoneNumber, username, password } = req.body;

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const findEmail = await UserModels.findOne({ email });

    if (findEmail) {
      next(
        new AppError({
          message: "User with this account already exists",
          httpcode: HTTPCODES.FORBIDDEN,
        })
      );
    }

    const Users = await UserModels.create({
      name,
      email,
      username,
      phoneNumber: "234" + phoneNumber,
      password: hashedPassword,
      confirmPassword: hashedPassword,
      status: "User",
    });

    return res.status(201).json({
      message: "Successfully created User",
      data: Users,
    });
  }
);

// Users Login:
export const UsersLogin = AsyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { email, password } = req.body;

    const CheckEmail = await UserModels.findOne({ email });

    if (!CheckEmail) {
      next(
        new AppError({
          message: "User not Found",
          httpcode: HTTPCODES.NOT_FOUND,
        })
      );
    }

    const CheckPassword = await bcrypt.compare(password, CheckEmail!.password);

    if (!CheckPassword) {
      next(
        new AppError({
          message: "Email or password not correct",
          httpcode: HTTPCODES.CONFLICT,
        })
      );
    }

    if (CheckEmail && CheckPassword) {
      return res.status(200).json({
        message: "Login Successfull",
        data: CheckEmail,
      });
    }
  }
);

// Get a single User:
export const GetSingleUser = AsyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const singleuser = await UserModels.findById(req.params.userID).populate({
      path: "companyGiftCards",
    });

    if (!singleuser) {
      next(
        new AppError({
          message: "User not found",
          httpcode: HTTPCODES.NOT_FOUND,
        })
      );
    }

    return res.status(200).json({
      message: "Successfully got this single user",
      data: singleuser,
    });
  }
);

// User wants to buy a business gift card using Kora's APIs to make Payment with ATM card - // User wants to buy a business gift card using payment with their card:
export const UserBuyAGiftCardWithATMcard = AsyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const {
      amount,
      name,
      number,
      cvv,
      pin,
      expiry_year,
      expiry_month,
      title,
      description,
    } = req.body;

    const GenerateTransactionReference = uuid();

    // To get both single user and business
    const user = await UserModels.findById(req.params.userID);
    const Business = await BusinessModels.findById(req.params.businessID);
    const giftcard = await GiftCardModels.findById(req.params.giftcardID);

    if (!user && !Business && !giftcard) {
      next(
        new AppError({
          message: "Invalid Account, Does not exist",
          httpcode: HTTPCODES.NOT_FOUND,
        })
      );
    }

    // If no gift card from this business:
    if (!Business?.giftCard) {
      next(
        new AppError({
          message: `${Business?.name} does not have a gift card yet`,
          httpcode: HTTPCODES.NOT_FOUND,
        })
      );
    }

    if (user && Business && giftcard) {
      // For user to make the payment from their bank to business wallet:
      const paymentData = {
        reference: GenerateTransactionReference,
        card: {
          name,
          number,
          cvv,
          pin,
          expiry_year,
          expiry_month,
        },
        amount,
        currency: "NGN",
        redirect_url: "https://merchant-redirect-url.com",
        customer: {
          name: user?.name,
          email: user?.email,
        },
        metadata: {
          internalRef: "JD-12-67",
          age: 15,
          fixed: true,
        },
      };

      // To stringify the payment data coming in
      const stringData = JSON.stringify(paymentData);
      //The data should be in buffer form according to Kora's pay
      const bufData = Buffer.from(stringData, "utf-8");
      const encryptedData = encryptAES256(encrypt, bufData);

      var config = {
        method: "post",
        maxBodyLength: Infinity,
        url: urlData,
        headers: {
          Authorization: `Bearer ${secret}`,
        },
        data: {
          charge_data: `${encryptedData}`,
        },
      };

      axios(config)
        .then(async function (response) {
          // To update the balance of the business with the amount the user bought with ATM card
          await BusinessModels.findByIdAndUpdate(Business?._id, {
            Balance: Business?.Balance + amount,
          });
          // To generate a receipt for the business and a notification
          const BusinesstransactionHistory = await HistoryModels.create({
            owner: Business?.name,
            message: `${user?.name} bought a gift card from your store with money worth of ${amount}`,
            transactionReference: GenerateTransactionReference,
            transactionType: "Credit",
          });

          Business?.TransactionHistory?.push(
            new mongoose.Types.ObjectId(BusinesstransactionHistory?._id)
          );
          Business.save();

          // To update the history of the user with his/her debit alert of buying a gift card
          const UserTransactionHistory = await HistoryModels.create({
            owner: user?.name,
            message: `You bought a gift card worth ${amount} from ${Business?.name}`,
            transactionReference: GenerateTransactionReference,
            transactionType: "Debit",
          });

          user?.TransactionHistory?.push(
            new mongoose.Types.ObjectId(UserTransactionHistory?._id)
          );
          user.save();

          return res.status(HTTPCODES.OK).json({
            message: `${user?.name} successfully made payments for ${Business?.name} gift cards`,
            data: {
              paymentInfo: UserTransactionHistory,
              paymentData: JSON.parse(JSON.stringify(response.data)),
            },
          });
        })
        .catch(function (error) {
          next(
            new AppError({
              message: "Transaction failed",
              httpcode: HTTPCODES.BAD_GATEWAY,
              name: "Network Error",
            })
          );
        });
    }
  }
);
