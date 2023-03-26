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
