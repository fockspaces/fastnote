import mongoose, { Schema } from "mongoose";

const paragraphSchema = new mongoose.Schema(
  {
    title: { type: String, default: "paragraph" },
    content: { type: String },
    isUpdated: { type: Boolean, default: true },
  },
  { timestamps: true }
);

const Paragraph = mongoose.model("Paragraph", paragraphSchema);
export default Paragraph;
