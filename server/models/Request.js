import { Schema, model } from "mongoose";

const required = true;

const requestSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: "User" }, // Who posted it (logged-in user's ID is automatically added to the request)
  description: { type: String, required },
  category: {
    type: String,
    enum: [
      "Errands",
      "Groceries",
      "Transport",
      "Household",
      "Pet Care",
      "Childcare",
      "Tutoring",
      "Tech Support",
      "Moving",
    ],
    default: "Errands",
  },
  when: { type: String, required },
  status: { type: String, enum: ["open", "helped"], default: "open" },
  acceptedHelper: { type: Schema.Types.ObjectId, ref: "User" }, // Who helped (not the user who posted the request)
  receivedOffers: [{ type: Schema.Types.ObjectId, ref: "Offer" }], // Offers received on a request (not the offers made by the user)
  createdAt: { type: Date, default: Date.now },
});

export default model("Request", requestSchema);
