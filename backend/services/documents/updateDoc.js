import Paragraph from "../../models/Paragraph.js";
import Document from "../../models/Document.js";

// @desc: update document with event
// @params: event <String>, updateData <Object>,
// document_id <Object_id>, paragraph_id <Object_id>
// @return: newDocument <Object> / newParagraph <Object>
export const updateDoc = async (event, updateData, document_id) => {
  const { paragraph_id } = updateData;
  if (event === "update_paragraph") {
    const newParagraph = await updatePargraph(updateData, paragraph_id);
    return newParagraph;
  }

  if (event === "insert_paragraph") {
    const newDocument = await insertNewParagraph(updateData, document_id);
    return newDocument;
  }

  if (event === "delete_paragraph") {
    const deletedParagrpah = await deleteParagraph(paragraph_id, document_id);
    return deletedParagrpah;
  }

  const newDocument = await updatePartials(updateData, document_id);
  return newDocument;
};

const updatePartials = async (updateData, document_id) => {
  const newDocument = await Document.findByIdAndUpdate(
    document_id,
    updateData,
    {
      new: true,
    }
  );
  return newDocument;
};

const updatePargraph = async (updateData, paragraph_id) => {
  const newParagraph = await Paragraph.findByIdAndUpdate(
    paragraph_id,
    updateData,
    {
      new: true,
    }
  );
  return newParagraph;
};

const insertNewParagraph = async (updateData, document_id) => {
  const newParagraph = new Paragraph(updateData);
  await newParagraph.save();

  await Document.findByIdAndUpdate(
    document_id,
    { $addToSet: { paragraphs: newParagraph._id } },
    { new: true }
  );
  return newParagraph;
};

const deleteParagraph = async (paragraph_id, document_id) => {
  const deletedParagrpah = await Paragraph.deleteOne({ _id: paragraph_id });
  const newDocument = await Document.findByIdAndUpdate(
    document_id,
    { $pull: { paragraphs: paragraph_id } },
    { new: true }
  );
  return deletedParagrpah;
};