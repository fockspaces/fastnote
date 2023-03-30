import Document from "../models/Document.js";

export const getAllDocuments = async (req, res) => {
  const offset = 10;
  const { paging, tagging } = req.query;
  const query = tagging
    ? { tags: { $in: Array.isArray(tagging) ? tagging : [tagging] } }
    : {};

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
    document.blocks = blocks;
    document.tags = tags ?? document.tags;

    await document.save();

    return res.json({ data: "Document updated successfully" });
  }

  document = new Document({
    title,
    is_favorite,
    blocks,
    tags,
  });
  await document.save();

  return res.json({ data: "Document created successfully" });
};
