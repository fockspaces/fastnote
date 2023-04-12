import Paragraph from "../../models/Paragraph.js";
import Document from "../../models/Document.js";
import User from "../../models/User.js";

// @desc delete all paragraphs in the documnet
// @params doucment <Object>
// @return paragraphs <Array of Objects>
export const deleteParagraphs = async (document) => {
  for (const paragraph_id of document.paragraphs) {
    await Paragraph.findByIdAndDelete(paragraph_id);
  }
  return document.paragraphs;
};

// @desc delete document by its id
// @params document_id <String>
// @return document <Object>
export const deleteDocumentById = async (document_id) => {
  const document = await Document.findByIdAndDelete(document_id);
  return document;
};
