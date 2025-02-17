import { Schema, model } from "mongoose";

const required = true;

const requestSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: "User" }, // Who posted it (logged-in user's ID is automatically added to the request)
  description: { type: String, required }, // E.g. "Can someone help me carry my groceries?"
  category: {
    type: String,
    enum: [
      "Errands",
      "Groceries",
      "Transport",
      "Household Help",
      "Pet Care",
      "Childcare",
      "Tutoring",
      "Tech Support",
      "Moving Help",
    ],
    default: "Errands",
  },
  when: { type: String, required }, // E.g. "Today", "Second week of May", "June 15, from 9 to 11 am"
  status: { type: String, enum: ["open", "helped"], default: "open" },
  createdAt: { type: Date, default: Date.now },
});

export default model("Request", requestSchema);
