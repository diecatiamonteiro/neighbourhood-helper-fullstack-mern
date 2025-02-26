import jwt from "jsonwebtoken";
import createError from "http-errors";
import User from "../models/User.js";

const checkToken = async (req, res, next) => {
  try {
    const jwtToken = req.cookies.jwtToken;
    if (!jwtToken) throw createError(401, "Please log in to continue.");

    const decoded = jwt.verify(jwtToken, process.env.JWT_SECRET);

    const user = await User.findById(decoded.id);
    if (!user) throw createError(401, "User no longer exists.");

    req.user = user; // now req.user contains the logged-in user's data
    req.isAuthenticated = true;

    next();
  } catch (error) {
    next(error);
  }
};

export default checkToken;
