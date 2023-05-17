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

describe("GET /api/documents/:document_id", () => {
  test("should return 200 and the details of a specific document when a valid document_id is provided", async () => {
    const response = await request(app)
      .get(`/api/documents/${testDocument._id}`)
      .set("Authorization", `Bearer ${token}`);

    expect(response.statusCode).toBe(200);
    expect(response.body).toMatchObject({
      data: {
        _id: testDocument._id.toString(),
        userId: testUser._id.toString(),
        title: testDocument.title,
        description: testDocument.description,
        is_favorite: testDocument.is_favorite,
        is_trash: testDocument.is_trash,
        paragraphs: expect.any(Array),
        tags: expect.any(Array),
        createdAt: expect.any(String),
        updatedAt: expect.any(String),
      },
    });
  });

  test("should return 400 when an invalid document_id is provided", async () => {
    const response = await request(app)
      .get("/api/documents/invalid_id")
      .set("Authorization", `Bearer ${token}`);

    expect(response.statusCode).toBe(400);
  });

  test("should return 401/403 when no JWT token is provided", async () => {
    const response = await request(app).get(
      `/api/documents/${testDocument._id}`
    );

    expect([401, 403]).toContain(response.statusCode);
  });
});

afterAll(async () => {
  // Remove all documents and collections individually
  await User.deleteMany();
  await Document.deleteMany();
  await Paragraph.deleteMany();

  // Close the database connection
  return await mongoose.connection.close();
});
