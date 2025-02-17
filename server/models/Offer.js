import { Schema, model } from "mongoose";

const offerSchema = new Schema({
  requestId: { type: Schema.Types.ObjectId, ref: "Request" }, // To which request
  helperId: { type: Schema.Types.ObjectId, ref: "User" }, // Who offered help
  message: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

export default model("Offer", offerSchema);
