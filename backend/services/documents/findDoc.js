import Document from "../../models/Document.js";

// @@@ desc fetch doc by id
// @@@ params document_id <Object_id>
// @@@ return document <Object>
export const findDoc = async (document_id) => {
  const document = await Document.findById(document_id);
  return document;
};
