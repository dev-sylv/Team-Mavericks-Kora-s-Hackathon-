import express from "express";
import {
  BusinessLogin,
  BusinessRegistration,
  CheckOutToBank,
  GetSingleBusinessAcount,
  GetSingleBusinessCards,
  UpdateBusinessLogo,
} from "../Controllers/BusinessControllers";

import {
  BusinessRegisterValidation,
  BusinessLoginValidation,
} from "../Middlewares/BusinessValidation/BusinessValidation";

import { BusinessLogo } from "../Config/Multer";

const BusinessRouter = express.Router();

BusinessRouter.route("/registerbusiness").post(
  BusinessRegisterValidation,
  BusinessRegistration
);
BusinessRouter.route("/loginbusiness").post(
  BusinessLoginValidation,
  BusinessLogin
);
BusinessRouter.route("/getsinglebusiness/:businessID").get(
  GetSingleBusinessAcount
);
BusinessRouter.route("/getsinglebusiness/:businessID/cards").get(
  GetSingleBusinessCards
);
BusinessRouter.route("/updatebusinesslogo/:id").patch(
  BusinessLogo,
  UpdateBusinessLogo
);
BusinessRouter.route("/withdraw-money/:businessID").post(CheckOutToBank);

export default BusinessRouter;
