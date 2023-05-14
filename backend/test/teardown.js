import mongoose from "mongoose";

// The globalTeardown function runs once after all test suites
export default async () => {
  console.log("teardown starting");

  // Close the server and database connection after tests
  await global.__SERVER__.close();
  await mongoose.connection.dropDatabase();
  await mongoose.connection.close();
  console.log("teardown finished");
};
