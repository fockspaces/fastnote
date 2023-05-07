import Document from "../../models/Document.js";
import mongoose from "mongoose";

// @params: userId (string)
// @return: tags (array of strings)
// @desc: return all tags in document with userId
export const fetchTags = async (userId) => {
  const uniqueTags = await Document.aggregate([
    { $match: { userId: new mongoose.Types.ObjectId(userId) } },
    { $unwind: "$tags" },
    { $group: { _id: "$tags" } },
  ]);

  const tagNames = uniqueTags.map((tag) => tag._id);
  return tagNames;
};
