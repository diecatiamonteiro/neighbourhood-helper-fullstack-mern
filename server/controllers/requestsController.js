import createError from "http-errors";
import Request from "../models/Request.js";
import User from "../models/User.js";

//! GET /requests - Fetch all help requests from all users
export const getAllRequests = async (req, res, next) => {
  try {
    const requests = await Request.find().populate("userId", "username firstName lastName").lean(); // Fetch all requests

    if (!requests || requests.length === 0) {
      return res.status(404).json({ message: "No requests found." });
    }

    res.status(200).json({
      success: true,
      status: 200,
      message: "All help requests fetched successfully.",
      totalRequests: requests.length,
      allRequests: requests,
    });
  } catch (error) {
    next(error);
  }
};

//! GET /requests/my-requests - Fetch all help requests from logged-in user
export const getUserRequests = async (req, res, next) => {
  try {
    const userId = req.user.id;

    const requests = await Request.find({ userId })
      .populate({
        path: 'receivedOffers',
        populate: {
          path: 'helperId',
          select: 'username firstName lastName'
        }
      })
      .populate('acceptedHelper', 'username firstName lastName')
      .lean();

    if (!requests.length) {
      return res.status(200).json({
        success: true,
        message: "You have not posted any help requests yet.",
        totalRequests: 0,
        requests: [],
      });
    }

    res.status(200).json({
      success: true,
      message: "User's requests fetched successfully.",
      totalRequests: requests.length,
      userRequests: requests,
    });
  } catch (error) {
    next(error);
  }
};

//! GET /requests/:id - Fetch a specific request by ID
export const getSpecificRequest = async (req, res, next) => {
  try {
    const request = await Request.findById(req.params.id)
      .populate("userId", "username email")
      .populate({
        path: 'receivedOffers',
        populate: {
          path: 'helperId',
          select: 'username firstName lastName'
        }
      })
      .populate('acceptedHelper', 'username firstName lastName')
      .lean();

    if (!request) {
      throw createError(404, "Request not found.");
    }

    res.status(200).json({
      success: true,
      status: 200,
      message: "Help request fetched successfully by ID.",
      request: request,
    });
  } catch (error) {
    next(error);
  }
};

//! POST /requests - Create a new help request
//! Runs after checkToken middleware
export const createRequest = async (req, res, next) => {
  try {
    const { _id } = req.user; // from checkToken middleware
    const { description, category, when } = req.body;

    if (!description || !category || !when) {
      throw createError(400, "Please fill in all required fields.");
    }

    const request = await Request.create({
      userId: _id, // req.user._id
      description,
      category,
      when,
    });

    await User.findByIdAndUpdate(_id, { $push: { requests: request._id } });
    
    res.status(201).json({
      success: true,
      status: 201,
      message: "Help request created successfully.",
      newRequest: request,
    });
  } catch (error) {
    next(error);
  }
};

//! DELETE /requests/:id - Delete a specific help request
//! Runs after checkToken middleware
export const deleteRequest = async (req, res, next) => {
  try {
    const request = await Request.findById(req.params.id);

    if (!request) {
      throw createError(404, "Request not found.");
    }

    // Ensure only the owner can delete the request
    // request.userId is the user who created request (stored in Request model)
    // req.user._id is the logged-in user (comes from checkToken middleware)
    if (request.userId.toString() !== req.user._id.toString()) {
      throw createError(403, "You are not allowed to delete this request.");
    }

    await Request.findByIdAndDelete(req.params.id);

    res.status(200).json({
      success: true,
      status: 200,
      message: "Help request deleted successfully.",
    });
  } catch (error) {
    next(error);
  }
};

//! PATCH /requests/:id - Update an existing help request
//! Runs after checkToken middleware
export const editRequest = async (req, res, next) => {
  try {
    const { description, category, when } = req.body;

    if (!description && !category && !when) {
      throw createError(400, "Please provide at least one field to update.");
    }

    const request = await Request.findById(req.params.id);

    if (!request) {
      throw createError(404, "Request not found.");
    }

    // Ensure only the owner can edit the request
    if (request.userId.toString() !== req.user._id.toString()) {
      throw createError(403, "You are not allowed to edit this request.");
    }

    const updatedRequest = await Request.findByIdAndUpdate(
      req.params.id, // Id of the request to update
      {
        description,
        category,
        when,
      }, // fields to update
      { new: true, runValidators: true } // update options (new: true returns the updated document and not the old one, runValidators: true follows the model validation rules, eg required fields, enum values)
    );

    res.status(200).json({
      success: true,
      status: 200,
      message: "Help request edited successfully.",
      updatedRequest: updatedRequest,
    });
  } catch (error) {
    next(error);
  }
};
