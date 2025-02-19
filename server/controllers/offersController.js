import createError from "http-errors";
import User from "../models/User.js";
import Request from "../models/Request.js";
import Offer from "../models/Offer.js";
import mongoose from "mongoose";

//! POST /offers/:requestId - Offer help on a specific request
//! Runs after checkToken middleware
export const offerHelp = async (req, res, next) => {
  try {
    const { requestId } = req.params;

    // Validate requestId format (must be a valid ObjectId, not a string)
    if (!mongoose.isValidObjectId(requestId)) {
      throw createError(400, "Invalid request ID format.");
    }

    const { message } = req.body;
    if (!message) throw createError(400, "Message is required.");

    const request = await Request.findById(requestId);
    if (!request) throw createError(404, "Request not found.");

    // Get helperId from authenticated user & validate format
    const helperId = req.user._id;
    if (!mongoose.isValidObjectId(helperId)) {
      throw createError(400, "Invalid user ID format.");
    }

    // Check if the user is the owner of the request
    const helper = await User.findById(helperId);
    if (!helper) throw createError(404, "Helper not found.");

    // Check if the helper has already offered help on this request
    const existingOffer = await Offer.findOne({ helperId, requestId });
    if (existingOffer)
      throw createError(400, "You have already offered help on this request.");

    // Create the new offer
    const offer = await Offer.create({ helperId, requestId, message });

    // Update helper's offersGiven array
    await User.findByIdAndUpdate(helperId, {
      $push: { offers: offer._id },
    });

    // Add offer to request's receivedOffers array (new)
    await Request.findByIdAndUpdate(requestId, {
      $push: { receivedOffers: offer._id },
    });

    // Add offer to request owner's offersReceived array (new)
    await User.findByIdAndUpdate(request.userId, {
      $push: { offersReceived: offer._id },
    });

    res.status(201).json({
      success: true,
      message: "Offer created successfully!",
      data: offer,
    });
  } catch (error) {
    next(error);
  }
};

//! GET /offers/:requestId - Get all offers for a specific request
//! Runs after checkToken middleware
export const getOffersForARequest = async (req, res, next) => {
  try {
    const { requestId } = req.params;

    // Check if request exists before fetching offers
    const request = await Request.findById(requestId);
    if (!request) throw createError(404, "Request not found.");

    const offers = await Offer.find({ requestId })
      .populate("helperId", "username email")
      .lean();

    res.status(200).json({
      success: true,
      status: 200,
      message: offers.length
        ? "Offer(s) fetched successfully for this specific request."
        : "No offers found for this request.",
      totalOffers: offers.length,
      offers: offers,
    });
  } catch (error) {
    next(error);
  }
};

//! GET /offers/my-offers - Get all offers from logged-in user
//! Runs after checkToken middleware
export const getUserOffers = async (req, res, next) => {
  try {
    const userId = req.user.id;

    const offers = await Offer.find({ helperId: userId })
      .populate({
        path: "requestId",
        populate: { path: "userId", select: "username email" },
      })
      .lean();

    if (!offers.length) {
      return res.status(200).json({
        success: true,
        message: "You have not made any offers yet.",
        totalOffers: 0,
        offers: [],
      });
    }

    res.status(200).json({
      success: true,
      message: "User's offers fetched successfully.",
      totalOffers: offers.length,
      userOffers: offers,
    });
  } catch (error) {
    next(error);
  }
};

//! DELETE /offers/cancel/:offerId - Creator of the offer cancels their own offer
//! Runs after checkToken middleware
export const cancelOwnOffer = async (req, res, next) => {
  try {
    const { offerId } = req.params;
    if (!offerId) throw createError(400, "Offer ID is required.");

    // Find offer
    const offer = await Offer.findById(offerId);
    if (!offer) throw createError(404, "Offer not found.");

    // Ensure only the helper (offer creator) can delete the offer
    const userId = req.user._id; // from checkToken middleware
    if (offer.helperId.toString() !== userId.toString())
      throw createError(403, "You are not allowed to delete this offer.");

    // Delete offer
    await Offer.findByIdAndDelete(offerId);

    res.status(200).json({
      success: true,
      status: 200,
      message: "You have successfully cancelled your offer.",
      deletedOffer: offer,
    });
  } catch (error) {
    next(error);
  }
};

//! DELETE /offers/reject/:offerId - Request creator rejects an offer
//! Runs after checkToken middleware
export const rejectOffer = async (req, res, next) => {
  try {
    const { offerId } = req.params;
    if (!offerId) throw createError(400, "Offer ID is required.");

    // Find the offer
    const offer = await Offer.findById(offerId);
    if (!offer) throw createError(404, "Offer not found.");

    // Find the request linked to this offer & populate `userId` (request creator)
    const request = await Request.findById(offer.requestId).populate(
      "userId",
      "username email"
    );
    if (!request) throw createError(404, "Associated request not found.");

    // Ensure the logged-in user is the request owner (not the helper)
    const userId = req.user._id;
    if (request.userId._id.toString() !== userId.toString()) {
      throw createError(403, "You are not allowed to reject this offer.");
    }

    await Offer.findByIdAndDelete(offerId);

    res.status(200).json({
      success: true,
      message: "You have rejected this offer from your request.",
      requestOwner: {
        username: request.userId.username,
        email: request.userId.email,
      },
      rejectedOffer: offer,
    });
  } catch (error) {
    next(error);
  }
};

//! PATCH /offers/:offerId - Update an existing offer
//! Runs after checkToken middleware
export const updateOffer = async (req, res, next) => {
  try {
    const { message } = req.body;
    if (!message)
      throw createError(400, "Please provide a message so it can be updated.");

    const offer = await Offer.findById(req.params.offerId);
    if (!offer) throw createError(404, "Offer not found.");

    // Ensure only the owner can edit the offer
    if (offer.helperId.toString() !== req.user._id.toString()) {
      throw createError(403, "You are not allowed to edit this offer.");
    }

    const updatedOffer = await Offer.findByIdAndUpdate(
      req.params.offerId, // Id of the offer to update
      { message }, // field to update
      { new: true, runValidators: true } // update options (new: true returns the updated document and not the old one, runValidators: true follows the model validation rules, eg required fields)
    );

    res.status(200).json({
      success: true,
      status: 200,
      message: "Offer edited successfully.",
      updatedOffer: updatedOffer,
    });
  } catch (error) {
    next(error);
  }
};

//! PATCH /offers/accept/:offerId - Request creator accepts an offer
//! Runs after checkToken middleware
export const acceptOffer = async (req, res, next) => {
  try {
    const { offerId } = req.params;
    if (!offerId) throw createError(400, "Offer ID is required.");

    // Find the offer and populate helper details
    const offer = await Offer.findById(offerId);
    if (!offer) throw createError(404, "Offer not found.");

    // Find the request linked to this offer
    const request = await Request.findById(offer.requestId);
    if (!request) throw createError(404, "Associated request not found.");

    // Ensure the logged-in user is the request owner
    const userId = req.user._id;
    if (request.userId.toString() !== userId.toString()) {
      throw createError(403, "Only the request owner can accept offers.");
    }

    // Check if request is already helped
    if (request.status === "helped") {
      throw createError(400, "This request has already been helped.");
    }

    // Update request status and set accepted helper
    const updatedRequest = await Request.findByIdAndUpdate(
      request._id,
      {
        status: "helped",
        acceptedHelper: offer.helperId,
      },
      { new: true }
    ).populate("acceptedHelper", "username firstName lastName");

    res.status(200).json({
      success: true,
      message: "Offer accepted successfully!",
      updatedRequest,
    });
  } catch (error) {
    next(error);
  }
};
