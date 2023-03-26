import { NextFunction, Request, Response } from "express";
import { AsyncHandler } from "../Utils/AsyncHandler";
import cloud from "../Config/cloudinary";
import bcrypt from "bcrypt";
import otpgenerator from "otp-generator";
import { AppError, HTTPCODES } from "../Utils/AppError";
import BusinessModels from "../Models/BusinessModels";
// import cloud from "../Config/cloudinary";

// Users Registration:
export const BusinessRegistration = AsyncHandler(
  async (req: any, res: Response, next: NextFunction) => {
    const { name, email, password, confirmPassword, phoneNumber } = req.body;

    const findEmail = await BusinessModels.findOne({ email });

    if (findEmail) {
      next(
        new AppError({
          message: "Business with this account already exists",
          httpcode: HTTPCODES.FORBIDDEN,
        })
      );
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const codename = name.slice(0, 3);

    const Business = await BusinessModels.create({
      name,
      email,
      phoneNumber: "+234" + phoneNumber,
      password: hashedPassword,
      confirmPassword: hashedPassword,
      BusinessCode:
        codename +
        otpgenerator.generate(10, {
          upperCaseAlphabets: false,
          specialChars: false,
          digits: true,
          lowerCaseAlphabets: false,
        }),
      status: "Business",
    });

    return res.status(201).json({
      message: "Successfully created Business Account",
      data: Business,
    });
  }
);
