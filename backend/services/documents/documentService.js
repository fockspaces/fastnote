import { deleteDocumentById } from "./documentUtils.js";
import { PAGE_LIMIT } from "../../configs/Configs.js";
import { fetchUser } from "../users/fetchUser.js";

export const deleteDoc = async (document_id, user) => {
  // find Document by document_id
  const document = await findDoc(document_id);
  if (!document) return { error: "document not found", err_code: 404 };

  // check ownership
  const getUser = await fetchUser(user);
  if (!document.user.equals(getUser._id) && !user.is_admin)
    return { error: "not authorized", err_code: 403 };

  // delete document
  await deleteDocumentById(document_id);
  // return deleted document
  return document;
};
