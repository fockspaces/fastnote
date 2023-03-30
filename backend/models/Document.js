const mongoose = require("mongoose");
const blockSchema = require("./Block");
const documentSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    title: { type: String, required: true },
    is_favorite: { type: Boolean, default: false },
    blocks: [blockSchema],
    tags: [{ type: String }],
  },
  { timestamps: true }
);

const Document = mongoose.model("Document", documentSchema);

module.exports = Document;
