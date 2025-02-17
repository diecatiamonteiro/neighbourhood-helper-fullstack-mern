import createError from "http-errors";
import bcrypt from "bcrypt";
import User from "../models/User.js";
import Request from "../models/Request.js";
import Offer from "../models/Offer.js";
import { createSendToken } from "../utils/jwt.js";

//! POST /users/register - Register a new user
export const register = async (req, res, next) => {
  try {
    const user = await User.create(req.body);
    createSendToken(user, 201, res, "User successfully registered."); // send a token for this user, with a status of 201, using res
  } catch (error) {
    if (error.code === 11000) {
      return next(
        createError(
          400,
          "User already exists. Try a different email or username."
        )
      );
    }
    next(error);
  }
};

//! POST /users/login - Authenticate user & login
export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return next(createError(400, "Please provide email and password."));
    }

    const user = await User.findOne({ email });

    // Compare hashed password with user input
    // Plain text password (password) entered by the user with the hashed password stored in DB (user.password)
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return next(createError(401, "Invalid email or password."));
    }

    createSendToken(user, 200, res, "User successfully logged in.");
  } catch (error) {
    next(error);
  }
};

//! GET /users/logout - Log out user
export const logout = async (req, res, next) => {
  try {
    const isProduction = process.env.NODE_ENV === "production";

    res.clearCookie("jwtToken", {
      httpOnly: true,
      secure: isProduction,
      sameSite: isProduction ? "None  " : "Lax",
    });
    res.status(200).json({
      success: true,
      status: 200,
      message: "User successfully logged out.",
    });
  } catch (error) {
    next(error);
  }
};

//! GET /users/data - Get data from logged-in user
//! Runs after checkToken middleware
export const getUserData = async (req, res, next) => {
  try {
    const { user, isAuthenticated } = req; // from req.user and req.isAuthenticated from checkToken middleware

    res.status(200).json({
      success: true,
      message: "User data fetched successfully.",
      user: user, // returns user data
      isAuthenticated: isAuthenticated, // returns authentication status
    });
  } catch (error) {
    next(error);
  }
};

//! PATCH /users/update - Update user data
//! Runs after checkToken middleware
export const updateUser = async (req, res, next) => {
  try {
    const { username, firstName, lastName, email, password, zipCode } =
      req.body;

    if (
      !username &&
      !firstName &&
      !lastName &&
      !email &&
      !password &&
      !zipCode
    ) {
      throw createError(400, "Please provide at least one field to update.");
    }

    const userId = req.user._id;

    const user = await User.findById(userId);
    if (!user) {
      throw createError(404, "User not found.");
    }

    let updatedFields = { username, firstName, lastName, email, zipCode };

    if (password) updatedFields.password = password; // Simply pass the plain password

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      updatedFields,
      { new: true, runValidators: true } // update options (new: true returns the updated document and not the old one, runValidators: true follows the model validation rules, eg required fields, enum values)
    );

    res.status(200).json({
      success: true,
      status: 200,
      message: "User data edited successfully.",
      updatedUser: updatedUser,
    });
  } catch (error) {
    next(error);
  }
};

//! DELETE /users/delete - Delete user account
//! Runs after checkToken middleware
export const deleteUser = async (req, res, next) => {
  try {
    const userId = req.user._id;

    const user = await User.findById(userId);
    if (!user) {
      throw createError(404, "User not found.");
    }

    await Request.deleteMany({ userId });
    await Offer.deleteMany({ helperId: userId });
    await User.findByIdAndDelete(userId);

    res.status(200).json({
      success: true,
      status: 200,
      message:
        "Your account and all related data have been deleted successfully.",
      deletedUser: user,
    });
  } catch (error) {
    next(error);
  }
};
