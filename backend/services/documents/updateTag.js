import Document from "../../models/Document.js";
import mongoose from "mongoose";

export const updateTags = async (userId, tags, newTagName) => {
  // Find documents matching tags includes any in tags field
  const matchingDocuments = await Document.find({
    userId: new mongoose.Types.ObjectId(userId),
    tags: { $in: tags },
  });

  // Store matching document ids in an array
  const matchingDocumentIds = matchingDocuments.map((doc) => doc._id);

  // Remove all tags in the tags array for matching documents
  await Document.updateMany(
    { _id: { $in: matchingDocumentIds } },
    { $pullAll: { tags: tags } }
  );

  // Insert newTagName if provided for matching documents
  if (newTagName) {
    await Document.updateMany(
      { _id: { $in: matchingDocumentIds } },
      { $addToSet: { tags: newTagName } }
    );
  }
};
