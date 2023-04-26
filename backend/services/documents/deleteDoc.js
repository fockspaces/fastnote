import Document from "../../models/Document.js";
import Paragraph from "../../models/Paragraph.js";
import { findDoc } from "./findDoc.js";
import cache from "../../utils/cache.js";

export const deleteDoc = async (document_id, user) => {
  // find Document by document_id
  const document = await findDoc(document_id);
  if (!document) return { error: "document not found", err_code: 404 };

  // check ownership
  if (!document.userId.equals(user._id) && !user.is_admin)
    return { error: "not authorized", err_code: 403 };

  // delete related paragraphs
  await Paragraph.deleteMany({ _id: { $in: document.paragraphs } });

  // delete document
  const deletedDocument = await Document.findByIdAndDelete(document_id);

  // invalidate three cases for favorite, trash and default
  const userId = document.userId;
  const baseCases = ["trash", "favorite", "default"];
  for (const caseSuffix of baseCases) {
    await cache.del(`documents:${userId}:${caseSuffix}`);
  }

  return deletedDocument; // return deleted document
};
