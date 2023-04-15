import Document from "../../models/Document.js";

// @desc: create a new document with the user and title
// @params: user_id <Object_id>, title <String>, tags <Array>
// @return: document <Object>
export const createDoc = async (docInfo) => {
  const document = new Document(docInfo);
  await document.save();
  return document;
};
