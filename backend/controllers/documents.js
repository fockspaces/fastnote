import mongoose from "mongoose";
import { createDoc } from "../services/documents/createDoc.js";
import { deleteDoc } from "../services/documents/deleteDoc.js";
import { findDoc } from "../services/documents/findDoc.js";
import { findDocs } from "../services/documents/findDocs.js";
import { summarizeDoc } from "../services/documents/summarizeDoc.js";
import { updateDoc } from "../services/documents/updateDoc.js";
import { fetchUser } from "../services/users/fetchUser.js";
import { escapeRegExp } from "../utils/regexEscape.js";
import cache from "../utils/cache.js";
import { fetchTags } from "../services/documents/fetchTags.js";
import { updateTags } from "../services/documents/updateTag.js";

// sprint 4 (fin)
export const getAllDocuments = async (req, res) => {
  // validation paging
  const { paging } = req.query;
  if ((paging && !Number.isInteger(parseInt(paging))) || paging < 0)
    return res.status(400).json({ error: "please provide a valid paging" });

  // find documents
  const documents = await findDocs({ ...req.query, userId: req.user._id });

  return res.status(200).json({ data: documents });
};

// *sprint 4 (fin)
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
  const document = await findDoc(document_id, true);
  if (!user._id.equals(document.userId))
    return res.status(403).json({ error: "forbidden (not the owner)" });

  // update doc
  const data = await updateDoc(event, updateData, document_id);
  return res.status(200).json({ message: "Updated successfully", data });
};

// *sprint 4 (fin)
export const createDocument = async (req, res) => {
  const { title, description, tags } = req.body;
  const userId = req.user._id;

  const document = await createDoc({ userId, title, tags, description });
  res.json({ message: "Document created successfully", document });
};

// *sprint 2 (fin)
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

export const summarizeDocument = async (req, res) => {
  const { document_id } = req.params;
  console.log("hi");

  // Extract the access_token from the Authorization header
  const authHeader = req.headers.authorization;
  const access_token = authHeader.split(" ")[1];

  const result = await summarizeDoc(document_id, access_token);
  if (result) {
    return res
      .status(200)
      .json({ message: "summary process finished", result });
  }
  return res.status(400).json({ message: "content length is less than 100" });
};

export const getAllTags = async (req, res) => {
  const userId = req.user._id;
  const tags = await fetchTags(userId);
  return res.status(200).json({ tags });
};

export const updateTagName = async (req, res) => {
  const userId = req.user._id;
  const { tags = [], newTagName } = req.body;

  if (!tags.length) {
    return res.status(400).json({ message: "tags is required." });
  }

  await updateTags(userId, tags, newTagName);

  return res.status(200).json({ message: "Tag updated successfully." });
};
