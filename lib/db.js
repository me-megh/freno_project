import mongoose from "mongoose";

const connectDB = async () => {
  // If the connection is already established, no need to connect again
  if (mongoose.connection.readyState >= 1) {
    return;
  }

  try {
    console.log("Attempting to connect to MongoDB...");
    // Connect to MongoDB with increased timeout options
    await mongoose.connect(process.env.MONGO_URI, {
      serverSelectionTimeoutMS: 5000, // 5 seconds
      socketTimeoutMS: 10000,
    });
    console.log("MongoDB connected");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    process.exit(1); // Exit the process if the database connection fails
  }
};

export default connectDB;
