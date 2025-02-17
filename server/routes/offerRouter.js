import express from "express";
import checkToken from "../middleware/checkToken.js";
import {
  cancelOwnOffer,
  getOffersForARequest,
  getUserOffers,
  offerHelp,
  rejectOffer,
  updateOffer,
} from "../controllers/offersController.js";

const router = express.Router();

router
  .get("/my-offers", checkToken, getUserOffers) // GET all offers from logged-in user
  .post("/:requestId", checkToken, offerHelp) // POST an offer to help on a request
  .get("/:requestId", checkToken, getOffersForARequest) // GET all offers for a request
  .delete("/cancel/:offerId", checkToken, cancelOwnOffer) // DELETE own offer
  .delete("/reject/:offerId", checkToken, rejectOffer) // DELETE Reject an offer from other user
  .patch("/:offerId", checkToken, updateOffer); // PATCH (partially update) an offer

export default router;
