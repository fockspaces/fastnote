import Document from "../../models/Document.js";
import { findDoc } from "./findDoc.js";

export const deleteDoc = async (document_id, user) => {
  // find Document by document_id
  const document = await findDoc(document_id);
  if (!document) return { error: "document not found", err_code: 404 };

  // check ownership
  if (!document.userId.equals(user._id) && !user.is_admin)
    return { error: "not authorized", err_code: 403 };

  // delete document
  const deletedDocument = await Document.findByIdAndDelete(document_id);
  return deletedDocument; // return deleted document
};

