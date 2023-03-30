import mongoose, { Schema } from "mongoose";

const documentSchema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: "User" },
    title: { type: String, required: true },
    is_favorite: { type: Boolean, default: false },
    blocks: [{ type: Schema.Types.ObjectId, ref: "Block" }],
    tags: [{ type: String }],
  },
  { timestamps: true }
);

const Document = mongoose.model("Document", documentSchema);
export default Document;
