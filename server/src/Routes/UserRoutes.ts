import express from "express";
import {
  GetSingleUser,
  UserBuyAGiftCardWithATMcard,
  UsersLogin,
  UsersRegistration,
} from "../Controllers/UserControllers";

import {
  UserRegisterValidation,
  UserLoginValidation,
} from "../Middlewares/UserValidation/UserValidation";

const UserRouter = express.Router();

UserRouter.route("/registeruser").post(
  UserRegisterValidation,
  UsersRegistration
);
UserRouter.route("/loginuser").post(UserLoginValidation, UsersLogin);
UserRouter.route("/getsingleuser/:userID").get(GetSingleUser);
UserRouter.route("/buyagiftcard/:userID/:businessID/:giftcardID").post(
  UserBuyAGiftCardWithATMcard
);

export default UserRouter;
