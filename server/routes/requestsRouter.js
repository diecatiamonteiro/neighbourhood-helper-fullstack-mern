import express from "express";
import {
  createRequest,
  deleteRequest,
  editRequest,
  getAllRequests,
  getSpecificRequest,
  getUserRequests,
} from "../controllers/requestsController.js";
import checkToken from "../middleware/checkToken.js";

const router = express.Router();

router
  .get("/my-requests", checkToken, getUserRequests) // GET all requests from logged-in user
  .get("/", getAllRequests) // GET all requests from all users
  .get("/:id", getSpecificRequest) // GET a single request
  .post("/", checkToken, createRequest) // POST a new request
  .patch("/:id", checkToken, editRequest) // PATCH (partially update) a request
  .delete("/:id", checkToken, deleteRequest); // DELETE a request

export default router;
