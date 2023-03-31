import mongoose, { Schema } from "mongoose";

const paragraphSchema = new mongoose.Schema({
  blocks: [{ type: mongoose.Schema.Types.ObjectId, ref: "Block" }],
});

const Paragraph = mongoose.model("Paragraph", paragraphSchema);
export default Paragraph;
