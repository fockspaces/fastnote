import mongoose from "mongoose";

const blockSchema = new mongoose.Schema({
  id: { type: String, required: true, index: true },
  type: { type: String, required: true },
  props: {
    textColor: { type: String, default: "default" },
    backgroundColor: { type: String, default: "default" },
    textAlignment: { type: String, default: "left" },
    level: {
      type: String,
      enum: ["1", "2", "3"],
    },
  },
  content: [{ type: mongoose.Schema.Types.Mixed }],
  children: [{ type: mongoose.Schema.Types.ObjectId, ref: "Block" }],
});

export default blockSchema;
