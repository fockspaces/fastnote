import {
  updateDoc,
  fetchUser,
  createDoc,
  findDoc,
  createBlocks,
  createPara,
  insertPara,
  updatePara,
} from "./documentUtils.js";
import { queryDocument } from "./documentUtils.js";
import { DOC_PAGE_OFFSET } from "../../configs/Configs.js";

export const saveDoc = async (data) => {
  const {
    user,
    title,
    document_id,
    tags,
    is_favorite = false,
    blocks,
    paragraph_id,
    paragraph_title,
  } = data;
  const userId = await fetchUser(user);
  // setup document
  const document = document_id
    ? await findDoc(document_id)
    : await createDoc(userId, title);

  // update staightly
  if (!blocks) {
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
        blocks,
        title: paragraph_title,
      })
    : await insertPara(document, paragraph_title, blocks);

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
  const documents = queryDocument(query, paging, DOC_PAGE_OFFSET);
  return documents;
};
