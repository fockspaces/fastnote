import Block from "../../models/Block.js";
import Paragraph from "../../models/Paragraph.js";
import Document from "../../models/Document.js";

// @desc: save blocks into block schema
// @params: blocks <Array of objects>
// @return: blockIds <Array of Object_id>
export const createBlocks = async (blocks) => {
  let blockIds = [];
  for (const blockData of blocks) {
    const block = new Block(blockData);
    block.save();
    blockIds.push(block._id);
  }
  return blockIds;
};

// @desc: save blocks_id into a new paragraph
// @params: blockIds <Array of Object_id>
// @return: paragraph_id <Object_id>
export const createPara = async (blockIds) => {
  const paragraph = new Paragraph(blockIds);
  return paragraph._id;
};

// @desc: create a new document with the user and title
// @params: user_id <Object_id>, title <String>
// @return: document <Object>
export const createDoc = async (user_id, title) => {
  const document = new Document({ user: user_id, title });
  return document;
};

// @desc: find the document with id
// @params: document_id <Object_id>
// @return: document <Object>
export const findDoc = async (document_id) => {
  const document = Document.find({ _id: document_id });
  return document;
};


