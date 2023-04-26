import mongoose, { Schema } from "mongoose";

const paragraphSchema = new mongoose.Schema(
  {
    document_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Document",
      required: true,
    },
    title: { type: String, default: "paragraph" },
    content: { type: String },
    isUpdated: { type: Boolean, default: true },
  },
  { timestamps: true }
);

const Paragraph = mongoose.model("Paragraph", paragraphSchema);
export default Paragraph;
