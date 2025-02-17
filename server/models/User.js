import { Schema, model } from "mongoose";
import bcrypt from "bcrypt";

const required = true;
const unique = true;

const userSchema = new Schema({
  username: { type: String, required, unique },
  firstName: { type: String, required },
  lastName: { type: String, required },
  email: { type: String, required, unique },
  password: { type: String, required },
  zipCode: {
    type: String,
    enum: [
      "04177 Lindenau, Alt-Lindenau, Neu-Lindenau",
      "04178 Böhlitz-Ehrenberg, Rückmarsdorf, Burghausen",
      "04179 Leutzsch",
    ],
    required,
  },
  requests: [{ type: Schema.Types.ObjectId, ref: "Request" }], // Requests posted by the user
  offers: [{ type: Schema.Types.ObjectId, ref: "Offer" }], // Offers made by the user
  createdAt: { type: Date, default: Date.now },
});

// Middleware: Hash password before saving to the database
userSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 12);
  }
  next();
});

// Middleware: Hash password before updating in the database
userSchema.pre("findOneAndUpdate", async function (next) {
  const update = this.getUpdate(); // Get update object
  if (update.password) {
    update.password = await bcrypt.hash(update.password, 12);
  }
  next();
});

// Utility Method: Check if input password matches the stored hashed password
userSchema.methods.isPasswordCorrect = async function (
  inputPassword,
  storedPassword
) {
  return await bcrypt.compare(inputPassword, storedPassword);
};

// Security: Remove sensitive data before sending user object to the client
userSchema.methods.toJSON = function () {
  const obj = this.toObject();
  delete obj.password;
  delete obj.__v;
  return obj;
};

export default model("User", userSchema);
