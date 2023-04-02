import Document from "../models/Document.js";
import {
  saveDoc,
  findDocs,
  deleteDoc,
} from "../services/documents/documentService.js";
import { findDocById } from "../services/documents/documentUtils.js";

export const getAllDocuments = async (req, res) => {
  let { paging, tagging } = req.query;
  // formatted the parameters
  paging = paging ? parseInt(paging) : 0;
  tagging = tagging ? JSON.parse(tagging) : [];

  // validation
  if (!Number.isInteger(paging) || paging < 0)
    return res.status(400).json({ error: "please provide a valid paging" });

  // find documents
  const documents = await findDocs(paging, tagging);

  return res.status(200).json({ data: documents });
};

export const getDocumentDetail = async (req, res) => {
  const { document_id } = req.params;

  const document = await findDocById(document_id);
  if (!document) {
    return res.status(404).json({ error: "Document not found" });
  }

  return res.status(200).json({ data: document });
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

export const deleteDocument = async (req, res) => {
  const user = req.user;
  const { document_id } = req.params;
  const document = await deleteDoc(document_id, user);
  if (document.error)
  
    return res.status(document.err_code).json({ error: document.error });
  return res
    .status(200)
    .json({ message: "successfully delete document", document });
};
