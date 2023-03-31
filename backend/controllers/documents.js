import Document from "../models/Document.js";
import Block from "../models/Block.js";

export const getAllDocuments = async (req, res) => {
  const offset = 10;
  const { paging, tagging } = req.query;
  let query = {};
  if (tagging) {
    const tagSelects = JSON.parse(tagging);
    query = {
      tags: {
        $all: Array.isArray(tagSelects) ? tagSelects : [tagSelects],
      },
    };
  }

  const documents = await Document.find(query)
    .sort({ created_at: -1 })
    .skip(paging ? parseInt(paging) * offset : 0)
    .limit(offset);
  return res.status(200).json({ data: documents });
};

export const getDocumentDetail = async (req, res) => {
  const { document_id } = req.params;

  const documents = await Document.findById(document_id).populate("blocks");

  if (!documents) {
    return res.status(404).json({ error: "Document not found" });
  }

  return res.json({ data: documents });
};

export const createOrUpdateDocument = async (req, res) => {
  const { document_id, title, blocks, tags, is_favorite } = req.body;
  // save Blocks in schema
  let Blocks = [];
  for (const blockData of blocks) {
    const block = new Block(blockData);
    block.save();
    Blocks.push(block._id);
  }

  let document;
  // If document ID is provided, update the existing document
  if (document_id) {
    document = await Document.findById(document_id);

    if (!document) {
      return res.status(400).json({ error: "Invalid document ID" });
    }

    // modify value
    document.title = title || document.title;
    document.is_favorite = is_favorite ?? document.is_favorite;
    document.blocks = Blocks || [];
    document.tags = tags ?? document.tags;

    await document.save();

    return res.json({ data: "Document updated successfully" });
  }

  document = new Document({
    title,
    is_favorite,
    blocks: Blocks || [],
    tags,
  });
  await document.save();

  return res.json({ data: "Document created successfully" });
};
