import mongoose from "mongoose";
import "dotenv/config";
import bcrypt from "bcrypt";
import users from "./usersData.js";
import User from "../../models/User.js";

(async () => {
  try {
    await mongoose.connect(process.env.DB_URI);
    console.log("Connected to MongoDB");

    await User.deleteMany({});
    console.log("Existing users deleted from DB.");

    //! Hash passwords before seeding (inserMany() overwrites the pre-save middleware in User.js)
    for (let user of users) {
      user.password = await bcrypt.hash(user.password, 12);
    }

    await User.insertMany(users);
    console.log("10 users seeded successfully.");
  } catch (error) {
    console.error("Error seeding users:", error);
  } finally {
    mongoose.connection.close();
    console.log("Database connection closed.");
  }
})();
