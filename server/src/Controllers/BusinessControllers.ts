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

// Business Login:
export const BusinessLogin = AsyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { email, password } = req.body;

    const CheckEmail = await BusinessModels.findOne({ email });

    if (!CheckEmail) {
      next(
        new AppError({
          message: "Business Account not Found",
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

// Get single Business Account:
export const GetSingleBusinessAcount = AsyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const SingleBusiness = await BusinessModels.findById(req.params.businessID);

    if (!SingleBusiness) {
      next(
        new AppError({
          message: "Business Account not found",
          httpcode: HTTPCODES.NOT_FOUND,
        })
      );
    }

    return res.status(200).json({
      message: "Successfully got this business account",
      data: SingleBusiness,
    });
  }
);

// Update Business Details:
export const UpdateBusinessLogo = AsyncHandler(
  async (req: any, res: Response, next: NextFunction) => {
    // const { logo } = req.body;

    const CloudImg = await cloud.uploader?.upload(req?.file!.path);

    const BusinessLogo = await BusinessModels.findByIdAndUpdate(
      req.params.id,
      { logo: CloudImg.secure_url },
      { new: true }
    );

    if (!BusinessLogo) {
      next(
        new AppError({
          message: "An error occured in updating business logo",
          httpcode: HTTPCODES.INTERNAL_SERVER_ERROR,
        })
      );
    }

    return res.status(201).json({
      message: "Successfully updated the business brand logo",
      data: BusinessLogo,
    });
  }
);
