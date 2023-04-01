import Document from "../models/Document.js";
import Block from "../models/Block.js";
import createOrUpdateDocument from "../services/documentService.js";

import saveDoc from "../services/documentService.js";

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

export const handleDocument = async (req, res) => {
  const documentData = req.body;
  const user = req.user;
  try {
    const document = await saveDoc({ ...documentData, user });
    res.json({ data: "Document created or updated successfully", document });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
