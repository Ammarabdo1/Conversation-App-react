import mongoose from "mongoose";
import "dotenv/config";

export const connectDB = async () => {
  try {
    await mongoose.connect(process.env.DB_URL);
    console.log("connected to the DB successfully👌");
  } catch (e) {
    console.log(`Error with connect DB: ${e.message}`);
    process.exit(1);
  }
};
