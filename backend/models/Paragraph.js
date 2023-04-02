import mongoose, { Schema } from "mongoose";

const paragraphSchema = new mongoose.Schema({
  title: { type: String, default: "paragraph" },
  blocks: [{ type: mongoose.Schema.Types.Mixed, required: true }],
});

const Paragraph = mongoose.model("Paragraph", paragraphSchema);
export default Paragraph;
