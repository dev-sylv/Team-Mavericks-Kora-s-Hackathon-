import express from "express";
import {
  AllGiftCards,
  BusinessGiftCard,
  GenerateAGiftCard,
} from "../Controllers/GiftCardControllers";

const GiftCardRoutes = express.Router();

GiftCardRoutes.route("/generateyourgiftcard/:businessID").post(
  GenerateAGiftCard
);
GiftCardRoutes.route("/getallgiftcards").get(AllGiftCards);
GiftCardRoutes.route("/businessgiftcard/:businessID").get(BusinessGiftCard);

export default GiftCardRoutes;
