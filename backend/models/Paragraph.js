import mongoose, { Schema } from "mongoose";

const paragraphSchema = new mongoose.Schema({
  title: { type: String, default: "paragraph" },
  content: { type: String, required: true },
});

const Paragraph = mongoose.model("Paragraph", paragraphSchema);
export default Paragraph;
