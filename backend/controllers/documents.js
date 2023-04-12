import mongoose from "mongoose";
import { createDoc } from "../services/documents/createDoc.js";
import { deleteDoc } from "../services/documents/deleteDoc.js";
import { findDoc } from "../services/documents/findDoc.js";
import { findDocs } from "../services/documents/findDocs.js";
import { updateDoc } from "../services/documents/updateDoc.js";
import { fetchUser } from "../services/users/fetchUser.js";

// *sprint 2 (fin)
export const getAllDocuments = async (req, res) => {
  // extract par
  const {
    paging = 0,
    tagging = [],
    is_trash = false,
    is_favorite = false,
  } = req.query;
  const userId = req.user._id;

  // preparing query parameters
  const query = { userId, is_trash, is_favorite };
  if (tagging.length) {
    const tags = tagging.split(",").map((tag) => tag.trim());
    query.tags = { $all: tags };
  }

  // const tags = tagging.length ? { $all: tagging } : {};
  // // validation paging
  // if (!Number.isInteger(paging) || paging < 0)
  //   return res.status(400).json({ error: "please provide a valid paging" });

  // find documents
  const documents = await findDocs(query, paging);

  return res.status(200).json({ data: documents });
};

// *sprint 2 (fin)
export const getDocumentDetail = async (req, res) => {
  const { document_id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(document_id)) {
    return res.status(400).json({ error: "Invalid document ID" });
  }

  const document = await findDoc(document_id);
  if (!document) {
    return res.status(404).json({ error: "Document not found" });
  }

  return res.status(200).json({ data: document });
};

// *sprint 2 (fin)
export const updateDocument = async (req, res) => {
  const { event, updateData } = req.body;
  const { document_id } = req.params;

  // auth the user
  const user = await fetchUser(req.user);
  const document = await findDoc(document_id);

  if (!user._id.equals(document.userId))
    return res.status(403).json({ error: "forbidden (not the owner)" });

  // update doc
  const data = await updateDoc(event, updateData, document_id);
  return res.status(200).json({ message: "Updated successfully", data });
};

// *sprint 2 (fin)
export const createDocument = async (req, res) => {
  const { title, tags } = req.body;
  const user = req.user;

  const document = await createDoc(user._id, title, tags);
  res.json({ message: "Document created successfully", document });
};

// *sprint 2 (unfin)
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
