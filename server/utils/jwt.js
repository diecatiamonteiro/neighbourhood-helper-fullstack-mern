import jwt from "jsonwebtoken";

export const createSendToken = (user, status, res, message = "Authentication successful.") => {
  const { JWT_SECRET, JWT_EXP } = process.env;

  // Create JWT token
  const jwtToken = jwt.sign({ id: user._id }, JWT_SECRET, {
    expiresIn: JWT_EXP,
  });

  // Set cookie options
  const cookieOptions = {
    maxAge: 10 * 60 * 1000, // 10min
    httpOnly: true,
    secure: true,
    sameSite: 'None',
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