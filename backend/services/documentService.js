import Document from "../models/Document.js";
import Block from "../models/Block.js";
import Paragraph from "../models/Paragraph.js";
import User from "../models/User.js";

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

const saveDoc = async (data) => {
  const {
    user,
    title,
    document_id,
    tags,
    is_favorite = false,
    blocks,
    paragraph_id,
  } = data;
  const userId = await fetchUser(user);
  // setup document
  const document = document_id
    ? await findDoc(document_id)
    : await createDoc(userId, title);

  // update directly
  if (!blocks) {
    return updateDoc(document, tags, is_favorite);
  }
  // setup paragraphs
  const blockIds = await createBlocks(blocks);
  const para_id = await createPara(blockIds);
  const newParagraphs = paragraph_id
    ? updatePara(document, paragraph_id, para_id)
    : insertPara(document, para_id);
  // update document
  return updateDoc(document, tags, is_favorite, newParagraphs);
};

export default saveDoc;
