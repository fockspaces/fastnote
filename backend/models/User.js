import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  google_id: { type: String, required: true, unique: true },
  email: { type: String, required: true },
  first_name: { type: String },
  last_name: { type: String },
  documents: [{ type: mongoose.Schema.Types.ObjectId, ref: "Document" }],
  created_at: { type: Date, default: Date.now },
  modified_at: { type: Date, default: Date.now },
});

export const User = mongoose.model("User", userSchema);
