import Document from "../../models/Document.js";
import mongoose from "mongoose";

export const updateTags = async (userId, tags, newTagName) => {
  // Remove all tags in the tags array
  await Document.updateMany(
    { userId: new mongoose.Types.ObjectId(userId), tags: { $in: tags } },
    { $pullAll: { tags: tags } }
  );

  // Insert newTagName if provided
  if (newTagName) {
    await Document.updateMany(
      { userId: new mongoose.Types.ObjectId(userId) },
      { $addToSet: { tags: newTagName } }
    );
  }
};
