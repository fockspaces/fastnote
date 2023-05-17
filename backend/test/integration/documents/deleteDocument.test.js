import request from "supertest";
import { connectDB } from "../../../utils/database.js";
import User from "../../../models/User.js";
import { sign } from "../../../utils/jwt.js";
import { JWT_options } from "../../../configs/Configs.js";
import Document from "../../../models/Document.js";
import mongoose from "mongoose";
import app from "../../../app.js";
import Paragraph from "../../../models/Paragraph.js";

let token;
let testUser;
let testDocument;

beforeAll(async () => {
  // not print out console error
//   jest.spyOn(console, "error").mockImplementation(() => {});

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

describe("DELETE /api/documents/:document_id", () => {
  test("should return 403 when user is not the owner", async () => {
    // Create a new user and use their token
    const notOwnerUser = new User({
      username: "notowner",
      email: "notowner@example.com",
      name: "Not Owner",
    });
    await notOwnerUser.save();
    const notOwnerToken = sign(notOwnerUser.toObject(), JWT_options);
    console.log({ notOwnerToken });

    const response = await request(app)
      .delete(`/api/documents/${testDocument._id}`)
      .set("Authorization", `Bearer ${notOwnerToken}`);
    expect(response.statusCode).toBe(403);
    expect(response.body.error).toEqual("forbidden (not the owner)");
    // Add more assertions to verify that the document is not deleted
  });

  test("should return 400 when document id is invalid", async () => {
    const response = await request(app)
      .delete(`/api/documents/nonexistentid`)
      .set("Authorization", `Bearer ${token}`);

    expect(response.statusCode).toBe(400);
    expect(response.body.error).toEqual("Invalid document ID");
    // No more assertions needed
  });

  test("should return 200 and delete the document when user is the owner", async () => {
    const response = await request(app)
      .delete(`/api/documents/${testDocument._id}`)
      .set("Authorization", `Bearer ${token}`);

    expect(response.statusCode).toBe(200);
    expect(response.body.message).toEqual("successfully delete document");
    // Add more assertions to verify that the document is actually deleted
  });

  test("should return 404 when document does not exist", async () => {
    const nonexistentId = new mongoose.Types.ObjectId();

    const response = await request(app)
      .delete(`/api/documents/${nonexistentId}`)
      .set("Authorization", `Bearer ${token}`);

    expect(response.statusCode).toBe(404);
    expect(response.body.error).toEqual("Document not found");
    // No more assertions needed
  });
});

afterAll(async () => {
//   console.error.mockRestore();

  // Remove all documents and collections individually
  await User.deleteMany();
  await Document.deleteMany();
  await Paragraph.deleteMany();

  // Close the database connection
  await mongoose.connection.close();
});
