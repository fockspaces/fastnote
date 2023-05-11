import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    const { MONGODB_URI } = process.env;
    await mongoose.connect(MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Database connected successfully");
  } catch (error) {
    console.error("Error connecting to the database", error);
    process.exit(1);
  }
};
