import request from "supertest";
import { connectDB } from "../../../utils/database.js";
import User from "../../../models/User.js";
import { sign } from "../../../utils/jwt.js";
import { JWT_options } from "../../../configs/Configs.js";
import Document from "../../../models/Document.js";
import mongoose from "mongoose";
import app from "../../../app.js";

let token;
let testUser;
let testDocument;

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

  // Create test document
  testDocument = new Document({
    userId: testUser._id,
    title: "Test Document",
    description: "This is a test document",
    is_favorite: false,
    is_trash: false,
    paragraphs: [],
    tags: ["test", "document"],
  });
  await testDocument.save();

  // Generate token for test user
  token = sign(testUser.toObject(), JWT_options);
});

describe("POST /api/documents", () => {
  describe("POST /api/documents", () => {
    test("should return 200 and create a new document when all required fields are provided", async () => {
      const newDocument = {
        title: "New Test Document",
        tags: ["test", "document"],
        description: "This is a new test document",
      };

      const response = await request(app)
        .post("/api/documents")
        .set("Authorization", `Bearer ${token}`)
        .send(newDocument);

      expect(response.statusCode).toBe(200);
      expect(response.body.message).toEqual("Document created successfully");
      expect(response.body.document).toMatchObject({
        ...newDocument,
        userId: testUser._id.toString(),
        is_favorite: false,
        is_trash: false,
      });
      // Clean up after creating the document
      await Document.deleteOne({ _id: response.body.document._id });
    });

    test("should return 200 and use default values when optional fields are not provided", async () => {
      const newDocument = {
        title: "New Test Document",
      };

      const response = await request(app)
        .post("/api/documents")
        .set("Authorization", `Bearer ${token}`)
        .send(newDocument);

      expect(response.statusCode).toBe(200);
      expect(response.body.document).toMatchObject({
        title: newDocument.title,
        userId: testUser._id.toString(),
        is_favorite: false,
        is_trash: false,
        tags: [],
      });
      // Clean up after creating the document
      await Document.deleteOne({ _id: response.body.document._id });
    });

    test("should return 401/403 when no JWT token is provided", async () => {
      const newDocument = {
        title: "New Test Document",
        tags: ["test", "document"],
        description: "This is a new test document",
      };

      const response = await request(app)
        .post("/api/documents")
        .send(newDocument);

      expect([401, 403]).toContain(response.statusCode);
      // Add more assertions for the error message or other properties as needed
    });
  });
});

afterAll(async () => {
  // Clean up the database
  await mongoose.connection.dropDatabase();
  mongoose.connection.close();
});
