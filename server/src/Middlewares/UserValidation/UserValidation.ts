import { RequestHandler } from "express";
import { validator } from "../validator";
import { UserSchemaValidation } from "./UserSchemaValidation";

export const UserRegisterValidation: RequestHandler = (req, res, next) =>
  validator(UserSchemaValidation.Register, req.body, next);

export const UserLoginValidation: RequestHandler = (req, res, next) =>
  validator(UserSchemaValidation.Login, req.body, next);
