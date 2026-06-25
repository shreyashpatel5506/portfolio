// lib/db.js
import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config(); // Load environment variables from .env.local
const mongoURI = process.env.MONGODB_URI; // Or your hardcoded string if not using env

const connectMongo = async () => {
  try {
    // If we already have a connection, reuse it (crucial for Next.js serverless functions)
    if (mongoose.connection.readyState >= 1) return;

    await mongoose.connect(mongoURI);
    console.log("MongoDB connected successfully");
  } catch (error) {
    console.error("MongoDB connection error:", error);
    throw error;
  }
};

export default connectMongo;
