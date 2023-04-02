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
export const createDoc = async (userId, title) => {
  const document = new Document({ user: userId, title });
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

// @desc query the documnet
// @params query <Object>, configs <Object>
// @return documents <Array of Objects>
export const queryDocument = async (
  query,
  paging,
  offset,
  sorting = { created_at: -1 }
) => {
  const documents = await Document.find(query)
    .sort(sorting)
    .skip(paging ? parseInt(paging) * offset : 0)
    .limit(offset)
    .populate("user", "name email picture");
  return documents;
};

// @desc fetch document by its id
// @params document_id <String>
// @return document <Object>
export const findDocById = async (document_id) => {
  const document = await Document.findById(document_id).populate("paragraphs");
  return document;
};

// @desc delete all paragraphs in the documnet
// @params doucment <Object>
// @return paragraphs <Array of Objects>
export const deleteParagraphs = async (document) => {
  for (const paragraph_id of document.paragraphs) {
    await Paragraph.findByIdAndDelete(paragraph_id);
  }
  return document.paragraphs;
};

// @desc delete document by its id
// @params document_id <String>
// @return document <Object>
export const deleteDocumentById = async (document_id) => {
  const document = await Document.findByIdAndDelete(document_id);
  return document;
};
