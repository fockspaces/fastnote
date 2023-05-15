import request from "supertest";
import { connectDB } from "../../../utils/database.js";
import User from "../../../models/User.js";
import { sign } from "../../../utils/jwt.js";
import { JWT_options } from "../../../configs/Configs.js";
import app from "../../../app.js";
import Document from "../../../models/Document.js";
import mongoose from "mongoose";
import Paragraph from "../../../models/Paragraph.js";

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

describe("GET /api/documents", () => {
  describe("GET /api/documents", () => {
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

    test("should return 200 and the test document when correct paging is provided", async () => {
      const response = await request(app)
        .get("/api/documents?paging=0")
        .set("Authorization", `Bearer ${token}`);

      expect(response.statusCode).toBe(200);
      response.body.data.forEach((doc) => {
        expect(doc).toEqual(
          expect.objectContaining({
            _id: expect.any(String),
            userId: expect.any(String),
            title: expect.any(String),
            description: expect.any(String),
            is_favorite: expect.any(Boolean),
            is_trash: expect.any(Boolean),
            paragraphs: expect.any(Array),
            tags: expect.any(Array),
            createdAt: expect.any(String),
            updatedAt: expect.any(String),
          })
        );
      });
    });
  });
});
afterAll(async () => {
  // Remove all documents and collections individually
  await User.deleteMany();
  await Document.deleteMany();
  await Paragraph.deleteMany();

  // Close the database connection
  await mongoose.connection.close();
});

