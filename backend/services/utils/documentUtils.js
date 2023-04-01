import Block from "../../models/Block.js";
import Paragraph from "../../models/Paragraph.js";
import Document from "../../models/Document.js";
import User from "../../models/User.js";

// @desc: fetch user_id from DB if any or create a new one
// @params: user <Object>
// @return: user_id <Object_id>
export const fetchUser = async (user) => {
  let getUser = await User.findOne({ userId: user.userId }).exec();
  if (!getUser) {
    getUser = new User(user);
    await getUser.save();
  }
  return getUser._id;
};

// @desc: save blocks into block schema
// @params: blocks <Array of objects>
// @return: blockIds <Array of Object_id>
export const createBlocks = async (blocks) => {
  let blockIds = [];
  for (const blockData of blocks) {
    const block = new Block(blockData);
    await block.save();
    blockIds.push(block._id);
  }
  return blockIds;
};

// @desc: save blocks_id into a new paragraph
// @params: blockIds <Array of Object_id>
// @return: paragraph_id <Object_id>
export const createPara = async (blockIds) => {
  const paragraph = new Paragraph(blockIds);
  await paragraph.save();
  return paragraph._id;
};

// @desc: create a new document with the user and title
// @params: user_id <Object_id>, title <String>
// @return: document <Object>
export const createDoc = async (user_id, title) => {
  const document = new Document({ user: user_id, title });
  await document.save();
  return document;
};

// @desc: find the document with id
// @params: document_id <Object_id>
// @return: document <Object>
export const findDoc = async (document_id) => {
  const document = await Document.findOne({ _id: document_id }).exec();
  return document;
};

// @desc append new paragraph for the document
// @params document <Object>, paragraph_id <Object_id>
// @return newParagraph <Object>
export const insertPara = (document, paragraph_id) => {
  const newParagraphs = [...document.paragraphs, paragraph_id];
  return newParagraphs;
};

// @desc replace the old paragraph with new one for the document
// @params document <Object>, para_target <Object_id>, para_new <Object_id>
// @return newParagraph <Object>
export const updatePara = (document, para_target, para_new) => {
  const newParagraphs = document.paragraphs.map((paragraph) => {
    if (paragraph === para_target) pargraph = para_new;
    return paragraph;
  });
  return newParagraphs;
};

// @desc: update tags and is_favorite in document
// @params: document <Object>, tags <array of strings>,
// is_favorite <boolean>, paragraphs <Object (default : empty array)>
// @return: newDocument <Object>
export const updateDoc = (document, tags, is_favorite, paragraphs = []) => {
  // update paragraphs if any
  const newParagraphs =
    paragraphs.length > 0 ? paragraphs : document.paragraphs;
  // todo : auto-generate the new tags
  const updatedDoc = {
    tags,
    is_favorite,
    paragraphs: newParagraphs,
  };
  const newDocument = { ...document.toObject(), ...updatedDoc };
  console.log(newDocument);
  return newDocument;
};
