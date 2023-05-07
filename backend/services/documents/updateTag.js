import Document from "../../models/Document.js";
import mongoose from "mongoose";

export const updateTag = async (userId, oldTagName, newTagName) => {
  if (newTagName)
    return await Document.updateMany(
      { userId: new mongoose.Types.ObjectId(userId), tags: oldTagName },
      [
        { $set: { tags: { $concatArrays: [[newTagName], "$tags"] } } },
        { $set: { tags: { $setDifference: ["$tags", [oldTagName]] } } },
      ]
    );

  return await Document.updateMany(
    { userId: new mongoose.Types.ObjectId(userId), tags: oldTagName },
    { $pull: { tags: oldTagName } }
  );
};
