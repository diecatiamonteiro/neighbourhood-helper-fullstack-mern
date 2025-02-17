import jwt from "jsonwebtoken";

export const createSendToken = (user, status, res, message = "Authentication successful.") => {
  const { JWT_SECRET, JWT_EXP } = process.env;

  // Create JWT token
  const jwtToken = jwt.sign({ id: user._id }, JWT_SECRET, {
    expiresIn: JWT_EXP,
  });

  // Set cookie options
  const isProduction = process.env.NODE_ENV === "production"; // Check if the app is running in production
  const cookieOptions = {
    maxAge: 10 * 60 * 1000, // 10min
    httpOnly: true, // Prevent XSS attacks (client-side scripts can't access this cookie)
    secure: isProduction, // Send cookie only via HTTPS in production
    sameSite: isProduction ? "None" : "Lax", // Allow cross-origin requests in production
  };

  // Send token as cookie
  res.cookie("jwtToken", jwtToken, cookieOptions);

  // Send response to client (no JWT token sent because it's stored in a cookie)
  res.status(status).json({
    success: true,
    status,
    message,
    data: user,
  });
};

//! When coding is done, change NODE_ENV to production in .env file