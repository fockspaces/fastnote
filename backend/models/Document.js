import mongoose, { Schema } from "mongoose";

const documentSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    title: { type: String, required: true },
    is_favorite: { type: Boolean, default: false },
    paragraphs: [{ type: mongoose.Schema.Types.ObjectId, ref: "Paragraph" }],
    tags: [{ type: String }],
  },
  { timestamps: true }
);

const Document = mongoose.model("Document", documentSchema);
export default Document;
