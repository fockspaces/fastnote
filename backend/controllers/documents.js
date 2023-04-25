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

// sprint 4 (fin)
export const getAllDocuments = async (req, res) => {
  // extract par
  const { paging, tagging = [], is_favorite, is_trash, keyword } = req.query;
  const userId = req.user._id;

  // validation paging
  if ((paging && !Number.isInteger(parseInt(paging))) || paging < 0)
    return res.status(400).json({ error: "please provide a valid paging" });

  // Check if the documents are in the Redis cache
  const cacheKey = `documents:${userId}:${JSON.stringify(req.query)}`;
  const cachedDocuments = await cache.get(cacheKey);
  if (cachedDocuments) {
    return res.status(200).json({ data: cachedDocuments });
  }

  // preparing query parameters
  const query = { userId };
  if (tagging.length)
    query.tags = {
      $all: tagging
        .split(",")
        .map((tag) => new RegExp(`^${escapeRegExp(tag.trim())}$`, "i")),
    };
  if (is_favorite) query.is_favorite = is_favorite;
  if (is_trash) query.is_trash = is_trash;

  // find documents
  const documents = await findDocs(query, keyword, paging);
  await cache.set(cacheKey, documents, 60);

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
  await summarizeDoc(document_id);
  return res.status(200).json({ message: "summary process finishded" });
};
