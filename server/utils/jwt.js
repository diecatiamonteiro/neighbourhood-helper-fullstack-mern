import jwt from "jsonwebtoken";

export const createSendToken = (user, status, res, message = "Authentication successful.") => {
  const { JWT_SECRET, JWT_EXP } = process.env;

  // Create JWT token
  const jwtToken = jwt.sign({ id: user._id }, JWT_SECRET, {
    expiresIn: JWT_EXP,
  });

  console.log('Creating JWT token for user:', user._id);

  // Set cookie options
  const cookieOptions = {
    maxAge: 10 * 60 * 1000, // 10min
    httpOnly: true,
    secure: true,
    sameSite: 'None',
    path: '/'
  };

  // Send token as cookie
  res.cookie("jwtToken", jwtToken, cookieOptions);

  // Also send token in response for header auth
  res.status(status).json({
    success: true,
    status,
    message,
    data: user,
    token: jwtToken // Add token to response
  });
};

//! When coding is done, change NODE_ENV to production in .env file