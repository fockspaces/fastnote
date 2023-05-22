import request from "supertest";
import app from "../../../app";
import mongoose from "mongoose";
import { sign } from "../../../utils/jwt.js";
import { JWT_options } from "../../../configs/Configs.js";
import User from "../../../models/User.js";
import Document from "../../../models/Document.js";
import { connectDB } from "../../../utils/database";
import Paragraph from "../../../models/Paragraph";
import { verify } from "jsonwebtoken";

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

  // Create test paragraph
  testParagraph = new Paragraph({
    document_id: testDocument._id, // Add the document_id field
    title: "Test Paragraph",
    content:
      "This is a test paragraph that content length over 100This is a test paragraph that content length over 100This is a test paragraph that content length over 100This is a test paragraph that content length over 100This is a test paragraph that content length over 100This is a test paragraph that content length over 100This is a test paragraph that content length over 100This is a test paragraph that content length over 100This is a test paragraph that content length over 100This is a test paragraph that content length over 100This is a test paragraph that content length over 100This is a test paragraph that content length over 100This is a test paragraph that content length over 100This is a test paragraph that content length over 100This is a test paragraph that content length over 100This is a test paragraph that content length over 100",
    isUpdated: true,
  });
  await testParagraph.save();

  // Add the paragraph to the test document
  testDocument.paragraphs.push(testParagraph);
  await testDocument.save();

  // Generate token for test user
  token = sign(testUser.toObject(), JWT_options);
});

describe("POST /documents/:document_id/summary", () => {
  test("should return 200 and a success message when summary process is finished", async () => {
    const response = await request(app)
      .post(`/api/documents/${testDocument._id}/summary`)
      .set("Authorization", `Bearer ${token}`);
    console.log(response.body.message);
    expect(response.statusCode).toBe(200);
    expect(response.body.message).toEqual("summary process finished");
    expect(response.body.result).toBe(true);
  });

  // test("should return 400 when content length is less than 100", async () => {
  //   // Create test paragraph with content length less than 100
  //   const shortParagraph = new Paragraph({
  //     document_id: testDocument._id,
  //     title: "Short Paragraph",
  //     content: "Short content",
  //     isUpdated: false,
  //   });
  //   await shortParagraph.save();

  //   // Add the short paragraph to the test document
  //   testDocument.paragraphs.push(shortParagraph);
  //   await testDocument.save();

  //   const response = await request(app)
  //     .post(`/api/documents/${testDocument._id}/summary`)
  //     .set("Authorization", `Bearer ${token}`);

  //   expect(response.statusCode).toBe(400);
  //   expect(response.body.message).toEqual("content length is less than 100");
  // });
});

afterAll(async () => {
  await User.deleteMany();
  await Document.deleteMany();
  return await mongoose.connection.close();
});
