import mongoose, { mongo } from "mongoose";

export default function connectDB() {
  mongoose.connection.on("connected", () =>
    console.log(
      `Successfully connected to the DB: ${mongoose.connection.name}`
    )
  );

  mongoose.connection.on("error", (error) => console.log("DB Error:", error));

  mongoose.connect(process.env.DB_URI);
}
