import express from "express";
import {
  getUserData,
  login,
  loginWithGoogle,
  logout,
  register,
  updateUser,
  deleteUser,
} from "../controllers/usersController.js";
import checkToken from "../middleware/checkToken.js";

const router = express.Router();

router
  .post("/register", register) // POST create a new user
  .post("/login", login) // POST login an existing user
  .post("/login/google", loginWithGoogle) // POST registration and login with Google (2in1)
  .get("/logout", logout) // GET logout the current user
  .get("/data", checkToken, getUserData) // GET logged-in user data
  .patch("/update", checkToken, updateUser) // PATCH update user data
  .delete("/delete", checkToken, deleteUser); // DELETE user account

export default router;
