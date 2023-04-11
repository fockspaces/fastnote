import mongoose from "mongoose";
import { createDoc } from "../services/documents/createDoc.js";
import {
  findDocs,
  deleteDoc,
} from "../services/documents/documentService.js";
import { findDocById } from "../services/documents/documentUtils.js";
import { fetchDoc } from "../services/documents/fetchDoc.js";
import { updateDoc } from "../services/documents/updateDoc.js";
import { fetchUser } from "../services/users/fetchUser.js";

// *sprint 2 (unfin)
export const getAllDocuments = async (req, res) => {
  let { paging, tagging } = req.query;
  const user = req.user;
  // formatted the parameters
  paging = paging ? parseInt(paging) : 0;
  tagging = tagging ? JSON.parse(tagging) : [];

  // validation
  if (!Number.isInteger(paging) || paging < 0)
    return res.status(400).json({ error: "please provide a valid paging" });

  // find documents
  const documents = await findDocs(paging, tagging, user);

  return res.status(200).json({ data: documents });
};

export const getDocumentDetail = async (req, res) => {
  const { document_id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(document_id)) {
    return res.status(400).json({ error: "Invalid document ID" });
  }

  const document = await findDocById(document_id);
  if (!document) {
    return res.status(404).json({ error: "Document not found" });
  }

  return res.status(200).json({ data: document });
};

// *sprint 2 (fin)
export const updateDocument = async (req, res) => {
  const { event, updateData, paragraph_id } = req.body;
  const { document_id } = req.params;

  // auth the user
  const user = await fetchUser(req.user);
  const document = await fetchDoc(document_id);
  if (!user._id.equals(document.userId))
    return res.status(403).json({ error: "forbidden (not the owner)" });

  // update doc
  const data = await updateDoc(event, updateData, document_id, paragraph_id);
  return res.status(200).json({ message: "Updated successfully", data });
};

// *sprint 2 (fin)
export const createDocument = async (req, res) => {
  const { title, tags } = req.body;
  const user = req.user;

  const document = await createDoc(user._id, title, tags);
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
