import Document from "../models/Document.js";
import {
  findDocs,
  deleteDoc,
  createNewDoc,
} from "../services/documents/documentService.js";
import { fetchUser, saveDoc } from "../services/documents/documentUtils.js";
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

export const updateDocument = async (req, res) => {
  const { document } = req.body;
  const user = await fetchUser(req.user);
  // auth the user
  if (!user._id.equals(document.user._id))
    return res.status(403).json({ error: "forbidden (not the owner)" });

  try {
    const newDocument = await saveDoc(document);
    res.json({ data: "Document updated successfully", newDocument });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const createDocument = async (req, res) => {
  const { title } = req.body;
  const user = req.user;

  const document = await createNewDoc({ title, user });
  res.json({ message: "Document created successfully", document });
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
