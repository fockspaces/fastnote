import {
  updateDoc,
  createDoc,
  findDoc,
  insertPara,
  updatePara,
  deleteDocumentById,
  deleteParagraphs,
} from "./documentUtils.js";
import { queryDocument } from "./documentUtils.js";
import { PAGE_LIMIT } from "../../configs/Configs.js";
import { fetchUser } from "../users/fetchUser.js";

export const createNewDoc = async ({ title, user, tags }) => {
  const document = await createDoc(user._id, title, tags);
  return document;
};

export const findDocs = async (paging, tagging, user) => {
  const getUser = await fetchUser(user);
  let query = {
    user: getUser._id,
  };
  if (tagging.length) {
    query.tags = {
      $all: tagging,
    };
  }
  const documents = queryDocument(query, paging, PAGE_LIMIT);
  return documents;
};

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
