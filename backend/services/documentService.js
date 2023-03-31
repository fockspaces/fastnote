import Document from "../models/Document.js";
import Block from "../models/Block.js";
import Paragraph from "../models/Paragraph.js";

const createBlocks = async (blockData) => {
  const block = new Block(blockData);
  await block.save();
  return block._id;
};

const createOrUpdateParagraph = async (paragraphData) => {
  console.log(paragraphData);
  const { id, title, blocks } = paragraphData;

  let paragraph;
  if (id) {
    paragraph = await Paragraph.findById(id);
  } else if (title) {
    paragraph = new Paragraph({ title });
  }

  if (!paragraph) {
    throw new Error("Invalid paragraph ID");
  }

  paragraph.blocks = await Promise.all(blocks.map(createBlocks));

  await paragraph.save();

  return paragraph;
};

const createDoc = async (documentData) => {
  const {
    document_id,
    document_title,
    paragraph_id,
    paragraph_title,
    blocks,
    tags,
    is_favorite,
  } = documentData;

  let document;
  if (id) {
    document = await Document.findById(id);

    if (!document) {
      throw new Error("Invalid document ID");
    }
  } else {
    document = new Document();
  }

  document.title = title || document.title;
  document.tags = tags || document.tags;
  document.is_favorite = is_favorite ?? document.is_favorite;

  document.paragraphs = await Promise.all(
    paragraphs.map(createOrUpdateParagraph)
  );

  await document.save();

  return document;
};

export default createDoc;
