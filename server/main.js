import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import "dotenv/config";

import connectDB from "./utils/database.js";
import usersRouter from "./routes/usersRouter.js";
import requestsRouter from "./routes/requestsRouter.js";
import offersRouter from "./routes/offerRouter.js";
import {
  globalErrorHandler,
  routeNotFound,
} from "./middleware/errorHandlers.js";

await connectDB();
const app = express();

app.use(cors({ origin: "http://localhost:5173", credentials: true })); // allows cross-origin requests from the FE
app.use(express.json()); // parses JSON bodies in the incoming requests (if any) and make them available in req.body
app.use(cookieParser()); // parses cookies from the incoming request headers and make them available in req.cookies

app.use("/users", usersRouter);
app.use("/requests", requestsRouter);
app.use("/offers", offersRouter);

app.use(routeNotFound);
app.use(globalErrorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
  console.log(`Server is up and running on http://localhost:${PORT}`)
);
