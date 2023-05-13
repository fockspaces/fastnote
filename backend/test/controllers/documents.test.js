import request from "supertest";

import { connectDB } from "../../utils/database.js";
import User from "../../models/User.js";
import { sign } from "../../utils/jwt.js";
import { JWT_options } from "../../configs/Configs.js";
import app from "../../app.js";

let token;
let testUser;

beforeAll(async () => {
  await connectDB();

  // Create test user
  testUser = new User({
    username: "testuser",
    email: "testuser@example.com",
    name: "Test User", // add this line
  });

  await testUser.save();

  // Generate token for test user
  token = sign(testUser.toObject(), JWT_options); // Use .toObject() to convert Mongoose document to plain object
});

describe("GET /api/documents", () => {
  test("should return 200 and a list of documents when correct paging is provided", async () => {
    const response = await request(app)
      .get("/api/documents?paging=1")
      .set("Authorization", `Bearer ${token}`);

    expect(response.statusCode).toBe(200);
    expect(Array.isArray(response.body.data)).toBe(true);
    // Include other assertions as needed
  });

  test("should return 400 when incorrect paging is provided", async () => {
    const response = await request(app)
      .get("/api/documents?paging=incorrect")
      .set("Authorization", `Bearer ${token}`);

    expect(response.statusCode).toBe(400);
    // Include other assertions as needed
  });

  test("should return 200 and a list of documents when no paging is provided", async () => {
    const response = await request(app)
      .get("/api/documents")
      .set("Authorization", `Bearer ${token}`);

    expect(response.statusCode).toBe(200);
    expect(Array.isArray(response.body.data)).toBe(true);
    // Include other assertions as needed
  });

  test("should return 401/403 when no JWT token is provided", async () => {
    const response = await request(app).get("/api/documents?paging=1");

    expect([401, 403]).toContain(response.statusCode);
    // Include other assertions as needed
  });
});

afterAll(async () => {
  // Clean up the database
  await User.deleteOne({ _id: testUser._id });
});
