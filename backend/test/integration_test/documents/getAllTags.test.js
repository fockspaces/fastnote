import request from "supertest";
import { connectDB } from "../../../utils/database.js";
import User from "../../../models/User.js";
import { sign } from "../../../utils/jwt.js";
import { JWT_options } from "../../../configs/Configs.js";
import app from "../../../app.js";
import Document from "../../../models/Document.js";
import mongoose from "mongoose";

let token;
let testUser;
let testDocuments;

beforeAll(async () => {
  await mongoose.disconnect();
  await connectDB();

  // Create test user
  testUser = new User({
    username: "testuser",
    email: "testuser@example.com",
    name: "Test User",
  });
  await testUser.save();

  // Create test documents with unique tags
  testDocuments = [
    {
      userId: testUser._id,
      title: "Test Document 1",
      description: "This is a test document",
      is_favorite: false,
      is_trash: false,
      paragraphs: [],
      tags: ["tag1", "tag2"],
    },
    {
      userId: testUser._id,
      title: "Test Document 2",
      description: "This is another test document",
      is_favorite: false,
      is_trash: false,
      paragraphs: [],
      tags: ["tag3", "tag4"],
    },
  ];
  await Document.insertMany(testDocuments);

  // Generate token for test user
  token = sign(testUser.toObject(), JWT_options);
});

describe("GET /api/documents/tags", () => {
    test("should return 200 and a list of unique tags", async () => {
      const response = await request(app)
        .get("/api/documents/tags")
        .set("Authorization", `Bearer ${token}`);

      expect(response.statusCode).toBe(200);
      expect(Array.isArray(response.body.tags)).toBe(true);

      // Note: you might want to sort the tags before comparing as the order might not be guaranteed
      expect(response.body.tags.sort()).toEqual(
        ["tag1", "tag2", "tag3", "tag4"].sort()
      );
    });

    test("should return 401/403 when no JWT token is provided", async () => {
      const response = await request(app).get("/api/documents/tags");

      expect([401, 403]).toContain(response.statusCode);
      // Include other assertions as needed
    });
  });
afterAll(async () => {
  // Remove all documents and collections individually
  await User.deleteMany();
  await Document.deleteMany();

  // Close the database connection
  return await mongoose.connection.close();
});
