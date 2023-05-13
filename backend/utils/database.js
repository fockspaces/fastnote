import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    const { MONGODB_URI, MONGODB_URI_TEST } = process.env;
    const dbConnection = process.env.NODE_ENV === "test" ? MONGODB_URI_TEST : MONGODB_URI;

    await mongoose.connect(dbConnection, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Database connected successfully");
  } catch (error) {
    console.log("Error connecting to the database", error);
    process.exit(1);
  }
};
