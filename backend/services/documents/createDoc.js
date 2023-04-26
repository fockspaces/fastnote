import Document from "../../models/Document.js";
import cache from "../../utils/cache.js";

// @desc: create a new document with the user and title
// @params: user_id <Object_id>, title <String>, tags <Array>
// @return: document <Object>
export const createDoc = async (docInfo) => {
  const document = new Document(docInfo);
  await document.save();

  const userId = docInfo.userId;
  // invalidate three cases for favorite, trash and default
  const baseCases = ["trash", "favorite", "default"];
  for (const caseSuffix of baseCases) {
    await cache.del(`documents:${userId}:${caseSuffix}`);
  }

  return document;
};
