import request from "supertest";
import { connectDB } from "../../../utils/database.js";
import User from "../../../models/User.js";
import { sign, verify } from "../../../utils/jwt.js";
import { JWT_options } from "../../../configs/Configs.js";
import Document from "../../../models/Document.js";
import mongoose from "mongoose";
import app from "../../../app.js";
import Paragraph from "../../../models/Paragraph.js";

let token;
let testUser;
let testDocument;
let testParagraph;

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
  console.log({ testDocument, testUser });

  // Create test paragraph
  testParagraph = new Paragraph({
    document_id: testDocument._id, // Add the document_id field
    title: "Test Paragraph",
    content: "This is a test paragraph",
    isUpdated: false,
  });
  await testParagraph.save();

  // Add the paragraph to the test document
  testDocument.paragraphs.push(testParagraph);
  await testDocument.save();

  // Generate token for test user
  token = sign(testUser.toObject(), JWT_options);
  console.log(verify(token));
});

describe("POST /api/documents/:document_id", () => {
  test("should return 200 and update the document when all required fields are provided", async () => {
    const updatedData = {
      event: "update_paragraph",
      updateData: {
        paragraph_id: testParagraph._id,
        title: "updated_title",
        content: "updated_content",
      },
    };

    const response = await request(app)
      .post(`/api/documents/${testDocument._id}`)
      .set("Authorization", `Bearer ${token}`)
      .send(updatedData);
    expect(response.statusCode).toBe(200);
    expect(response.body.message).toEqual("Updated successfully");
    // Add more assertions for the updated document or paragraph
  });

  test("should return 403 when a user tries to update a document they do not own", async () => {
    const anotherUser = new User({
      username: "anotheruser",
      email: "anotheruser@example.com",
      name: "Another User",
    });
    await anotherUser.save();

    const anotherToken = sign(anotherUser.toObject(), JWT_options);

    const updatedData = {
      event: "update_paragraph",
      updateData: {
        paragraph_id: testParagraph._id,
        title: "updated_title",
        content: "updated_content",
      },
    };

    const response = await request(app)
      .post(`/api/documents/${testDocument._id}`)
      .set("Authorization", `Bearer ${anotherToken}`)
      .send(updatedData);

    expect(response.statusCode).toBe(403);
    // Add more assertions for the error message or other properties as needed
  });

  test("should return 401/403 when no JWT token is provided", async () => {
    const updatedData = {
      event: "update_paragraph",
      updateData: {
        paragraph_id: "dummy_paragraph_id",
        title: "updated_title",
        content: "updated_content",
      },
    };

    const response = await request(app)
      .post(`/api/documents/${testDocument._id}`)
      .send(updatedData);

    expect([401, 403]).toContain(response.statusCode);
    // Add more assertions for the error message or other properties as needed
  });
});

afterAll(async () => {
  await User.deleteMany();
  await Document.deleteMany();
  await Paragraph.deleteMany();
  await mongoose.connection.close();
});
