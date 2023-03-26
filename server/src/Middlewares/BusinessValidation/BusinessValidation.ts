import { RequestHandler } from "express";
import { validator } from "../validator";
import { BusinessSchemaValidation } from "./BusinessSchema";

export const BusinessRegisterValidation: RequestHandler = (req, res, next) =>
  validator(BusinessSchemaValidation.Register, req.body, next);

export const BusinessLoginValidation: RequestHandler = (req, res, next) =>
  validator(BusinessSchemaValidation.Login, req.body, next);
