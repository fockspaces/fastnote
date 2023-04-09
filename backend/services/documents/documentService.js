import {
  updateDoc,
  fetchUser,
  createDoc,
  findDoc,
  insertPara,
  updatePara,
  deleteDocumentById,
  deleteParagraphs,
} from "./documentUtils.js";
import { queryDocument } from "./documentUtils.js";
import { PAGE_LIMIT } from "../../configs/Configs.js";

export const saveDoc = async (data) => {
  const {
    user,
    title,
    document_id,
    tags,
    is_favorite = false,
    content,
    paragraph_id,
    paragraph_title,
  } = data;
  const userId = await fetchUser(user);
  // setup document
  const document = document_id
    ? await findDoc(document_id)
    : await createDoc(userId, title);

  // update staightly
  if (!content) {
    const newDocument = updateDoc(document, {
      tags,
      is_favorite,
      title,
    });
    return newDocument;
  }
  // get the info of new documents
  let newParagraphs;
  newParagraphs = paragraph_id
    ? await updatePara(document, paragraph_id, {
        content,
        title: paragraph_title,
      })
    : await insertPara(document, paragraph_title, content);

  // update document
  const newDocument = await updateDoc(document, {
    tags,
    is_favorite,
    title,
  });

  // prepare response data
  const responseData = {
    user: newDocument.user,
    title: newDocument.title,
    is_favorite: newDocument.is_favorite,
    tags: newDocument.tags,
    paragraphs: newParagraphs,
    createdAt: newDocument.createdAt,
    updatedAt: newDocument.updatedAt,
  };

  return responseData;
};

export const findDocs = async (paging, tagging) => {
  const query = tagging.length
    ? {
        tags: {
          $all: tagging,
        },
      }
    : {};
  const documents = queryDocument(query, paging, PAGE_LIMIT);
  return documents;
};

export const deleteDoc = async (document_id, user) => {
  // find Document by document_id
  const document = await findDoc(document_id);
  if (!document) return { error: "document not found", err_code: 404 };

  // check ownership
  const getUser = await fetchUser(user);
  if (!document.user.equals(getUser) && !user.is_admin)
    return { error: "not authorized", err_code: 403 };

  // delete all paragraphs in the document
  await deleteParagraphs(document);
  // delete document
  await deleteDocumentById(document_id);
  // return deleted document
  return document;
};
