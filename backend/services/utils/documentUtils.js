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
// @params: title <String>, blocks <Array of Objects>
// @return: paragraph_id <Object_id>
export const createPara = async (title, blocks) => {
  const paragraph = new Paragraph({ title, blocks });
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
// @params document <Object>, title <String>, blocks <Array of Objects>
// @return newParagraphs <Array of Object>
export const insertPara = async (document, title, blocks) => {
  const newParagraph_id = await createPara(title, blocks);
  const newParagraphs = [...document.paragraphs, newParagraph_id];
  document.paragraphs.push(newParagraph_id);
  await document.save();
  return newParagraphs;
};

// @desc replace the blocks in the paragraph by para_id
// @params document <Object>, para_id <Object_id>, blocks <Object>
// @return newParagraphs <Array of Object>
export const updatePara = async (document, para_id, updateData) => {
  const updatedParagraph = await Paragraph.findByIdAndUpdate(
    para_id,
    updateData,
    { new: true } // returns the updated document
  );

  return document.paragraphs.map((paragraph) => {
    return paragraph._id.equals(para_id) ? updatedParagraph : paragraph;
  });
};

// @desc: update tags and is_favorite in document
// @params: document <Object>, updateData <Object>
// @return: newDocument <Object>
export const updateDoc = async (document, updateData) => {
  // todo : auto-generate the new tags
  const newDocument = await Document.findByIdAndUpdate(
    document._id,
    updateData,
    {
      new: true,
    }
  );
  return newDocument;
};

export const queryDocument = async (
  query,
  paging,
  offset,
  sorting = { created_at: -1 }
) => {
  const documents = await Document.find(query)
    .sort(sorting)
    .skip(paging ? parseInt(paging) * offset : 0)
    .limit(offset);
  return documents;
};

export const findDocById = async (document_id) => {
  const document = await Document.findById(document_id).populate("paragraphs");
  return document;
};
