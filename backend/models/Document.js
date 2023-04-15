import mongoose, { Schema } from "mongoose";

const documentSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    title: { type: String, required: true },
    description: { type: String },
    is_favorite: { type: Boolean, default: false },
    is_trash: { type: Boolean, default: false },
    paragraphs: [{ type: mongoose.Schema.Types.ObjectId, ref: "Paragraph" }],
    tags: [{ type: String, default: ["default tag"] }],
  },
  { timestamps: true }
);

// Middleware to delete related paragraphs when a document is removed
documentSchema.pre("remove", async function (next) {
  try {
    await mongoose
      .model("Paragraph")
      .deleteMany({ _id: { $in: this.paragraphs } });
    next();
  } catch (err) {
    next(err);
  }
});

const Document = mongoose.model("Document", documentSchema);
export default Document;
