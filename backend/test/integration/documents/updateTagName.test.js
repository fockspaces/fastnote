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
      tags: ["tag1", "tag2"],
    },
  ];
  await Document.insertMany(testDocuments);

  // Generate token for test user
  token = sign(testUser.toObject(), JWT_options);
});

describe("PATCH /api/documents/tags", () => {
  test("should update tags successfully and return 200", async () => {
    const response = await request(app)
      .patch("/api/documents/tags")
      .set("Authorization", `Bearer ${token}`)
      .send({
        tags: ["tag1"],
        newTagName: "newTag",
      });

    expect(response.statusCode).toBe(200);
    expect(response.body.message).toBe("Tag updated successfully.");
  });

  test("should return 400 when no tags are provided", async () => {
    const response = await request(app)
      .patch("/api/documents/tags")
      .set("Authorization", `Bearer ${token}`)
      .send({
        newTagName: "newTag",
      });

    expect(response.statusCode).toBe(400);
    expect(response.body.message).toBe("tags is required.");
  });

  test("should return 401/403 when no JWT token is provided", async () => {
    const response = await request(app)
      .patch("/api/documents/tags")
      .send({
        tags: ["tag1"],
        newTagName: "newTag",
      });

    expect([401, 403]).toContain(response.statusCode);
  });
});

afterAll(async () => {
  // Remove all documents and collections individually
  await User.deleteMany();
  await Document.deleteMany();

  // Close the database connection
  return await mongoose.connection.close();
});
