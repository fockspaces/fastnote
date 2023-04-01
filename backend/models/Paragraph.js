import mongoose, { Schema } from "mongoose";

const paragraphSchema = new mongoose.Schema({
  title: { type: String, required: true },
  blocks: [{ type: mongoose.Schema.Types.ObjectId, ref: "Block" }],
});

const Paragraph = mongoose.model("Paragraph", paragraphSchema);
export default Paragraph;
