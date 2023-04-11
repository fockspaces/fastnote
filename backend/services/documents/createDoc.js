import Document from "../../models/Document.js";

// @desc: create a new document with the user and title
// @params: user_id <Object_id>, title <String>, tags <Array>
// @return: document <Object>
export const createDoc = async (userId, title, tags) => {
  const document = new Document({ userId, title, tags });
  await document.save();
  return document;
};
