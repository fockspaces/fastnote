import {
  updateDoc,
  fetchUser,
  createDoc,
  findDoc,
  createBlocks,
  createPara,
  insertPara,
  updatePara,
} from "./utils/documentUtils.js";
import { queryDocument } from "./utils/documentUtils.js";
import { DOC_PAGE_OFFSET } from "../configs/Configs.js";

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

  // update directly
  if (!blocks) {
    const newDocument = updateDoc(document, {
      tags,
      is_favorite,
      title,
    });
    return newDocument;
  }
  // setup paragraphs
  //   const blockIds = await createBlocks(blocks);
  const para_id = await createPara(paragraph_title, blocks);

  const newParagraphs = paragraph_id
    ? await updatePara(document, paragraph_id, para_id)
    : insertPara(document, para_id);
  // update document
  const newDocument = updateDoc(document, {
    tags,
    is_favorite,
    title,
    paragraphs: newParagraphs,
  });
  return newDocument;
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
