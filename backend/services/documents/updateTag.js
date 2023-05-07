import Document from "../../models/Document.js";
import mongoose from "mongoose";

export const updateTag = async (userId, oldTagName, newTagName) => {
  await Document.updateMany(
    { userId: new mongoose.Types.ObjectId(userId), tags: oldTagName },
    { $set: { "tags.$": newTagName } }
  );
};
