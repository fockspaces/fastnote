import Paragraph from "../../models/Paragraph.js";
import Document from "../../models/Document.js";
import cache from "../../utils/cache.js";
import { stripHTMLTags } from "./summarizeDoc.js";

// --------------------------------------------------------------------------
// @params: event <String>, updateData <Object>,
// document_id <Object_id>, paragraph_id <Object_id>
// @return: newDocument <Object> / newParagraph <Object>
// @desc: update document with event
export const updateDoc = async (event, updateData, document_id) => {
  const { paragraph_id } = updateData;
  let result;

  switch (event) {
    case "update_paragraph":
      result = await updatePargraph(updateData, paragraph_id);
      break;

    case "insert_paragraph":
      result = await insertNewParagraph(updateData, document_id);
      break;

    case "delete_paragraph":
      result = await deleteParagraph(paragraph_id, document_id);
      break;

    default:
      result = await updatePartials(updateData, document_id);
      break;
  }

  // Update updatedAt timestamp
  await Document.findByIdAndUpdate(document_id, { updatedAt: Date.now() });
  return result;
};

// --------------------------------------------------------------------------
const updatePartials = async (updateData, document_id) => {
  const newDocument = await Document.findByIdAndUpdate(
    document_id,
    updateData,
    {
      new: true,
    }
  );
  await cache.flushPop(newDocument.userId);
  return newDocument;
};

// --------------------------------------------------------------------------
const updatePargraph = async (updateData, paragraph_id) => {
  const plainText = stripHTMLTags(updateData.content);

  const newParagraph = await Paragraph.findByIdAndUpdate(
    paragraph_id,
    { ...updateData, plainText },
    {
      new: true,
    }
  );
  return newParagraph;
};

// --------------------------------------------------------------------------
const insertNewParagraph = async (updateData, document_id) => {
  const newParagraph = new Paragraph({ ...updateData, document_id });
  await newParagraph.save();

  await Document.findByIdAndUpdate(
    document_id,
    { $addToSet: { paragraphs: newParagraph._id } },
    { new: true }
  );
  return newParagraph;
};

// --------------------------------------------------------------------------
const deleteParagraph = async (paragraph_id, document_id) => {
  const deletedParagrpah = await Paragraph.deleteOne({ _id: paragraph_id });
  await Document.findByIdAndUpdate(
    document_id,
    { $pull: { paragraphs: paragraph_id } },
    { new: true }
  );
  return deletedParagrpah;
};
