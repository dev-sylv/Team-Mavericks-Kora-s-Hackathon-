import express from "express";
import {
  BusinessLogin,
  BusinessRegistration,
  GetSingleBusinessAcount,
  UpdateBusinessLogo,
} from "../Controllers/BusinessControllers";

import { BusinessLogo } from "../Config/Multer";

const BusinessRouter = express.Router();

BusinessRouter.route("/registerbusiness").post(BusinessRegistration);
BusinessRouter.route("/loginbusiness").post(BusinessLogin);
BusinessRouter.route("/getsinglebusiness/:businessID").get(
  GetSingleBusinessAcount
);
BusinessRouter.route("/updatebusinesslogo/:id").patch(
  BusinessLogo,
  UpdateBusinessLogo
);

export default BusinessRouter;
