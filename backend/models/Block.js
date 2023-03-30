import mongoose, { Schema } from "mongoose";

const blockSchema = new Schema({
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
  content: [{ type: Schema.Types.Mixed }],
  children: [{ type: Schema.Types.ObjectId, ref: "Block" }],
});

const Block = mongoose.model("Block", blockSchema);
export default Block;
