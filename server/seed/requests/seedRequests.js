import mongoose from "mongoose";
import "dotenv/config";
import Request from "../../models/Request.js";
import User from "../../models/User.js";
import { categoryDescriptions, whenOptions } from "./requestsData.js";

async function seedRequests() {
  try {
    await mongoose.connect(process.env.DB_URI);
    console.log("Connected to MongoDB");

    await Request.deleteMany({});
    console.log("Existing requests deleted from DB.");

    // Get all user IDs from the DB
    const users = await User.find({}, "_id"); // {} selects all users, "_id" retrieves only user IDs

    if (users.length === 0) {
      console.log("No users found in DB. Seed users first.");
    }

    //! Step 1: Create 20 random requests
    const requests = Array.from({ length: 20 }).map(() => {
      // Assign a random user
      const userId = users[Math.floor(Math.random() * users.length)]._id;

      // Get category names from categoryDescriptions object
      const categories = Object.keys(categoryDescriptions);

      // Pick a random category
      const category =
        categories[Math.floor(Math.random() * categories.length)];

      // Pick a matching description for the selected category
      const description =
        categoryDescriptions[category][
          Math.floor(Math.random() * categoryDescriptions[category].length)
        ];

      // Pick a random "when" option
      const when = whenOptions[Math.floor(Math.random() * whenOptions.length)];

      // Return an object with the following request data:
      return {
        userId,
        description,
        category,
        when,
      };
    });

    //! Step 2: Insert all requests into the DB
    const insertedRequests = await Request.insertMany(requests);
    console.log(`${insertedRequests.length} requests seeded successfully.`);

    //! Step 3: Update each user to store their request IDs
    for (const request of insertedRequests) {
      await User.findByIdAndUpdate(request.userId, {
        $push: { requests: request._id },
      });
    }
    console.log("User request lists updated successfully.");
  } catch (error) {
    console.error("Error seeding requests:", error);
  } finally {
    mongoose.connection.close();
    console.log("Database connection closed.");
  }
}

seedRequests();
