import Document from "../../models/Document.js";
import Paragraph from "../../models/Paragraph.js";
import { findDoc } from "./findDoc.js";
import cache from "../../utils/cache.js";

export const deleteDoc = async (document_id) => {
  // find Document by document_id
  const document = await findDoc(document_id);

  if (!document) return null;

  // delete related paragraphs
  await Paragraph.deleteMany({ _id: { $in: document.paragraphs } });

  // delete document
  const deletedDocument = await Document.findByIdAndDelete(document_id);

  // invalidate three cases for favorite, trash and default
  cache.flushPop(document.userId);

  return deletedDocument; // return deleted document
};
