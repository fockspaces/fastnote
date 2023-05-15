import mongoose from "mongoose";
import { findDoc } from "../services/documents/findDoc.js";
import { fetchUser } from "../services/users/fetchUser.js";

export const pageInvalid = (paging) => {
  return (paging && !Number.isInteger(parseInt(paging))) || paging < 0;
};

export const isObjectId = (id) => {
  return mongoose.Types.ObjectId.isValid(id);
};

export const isDocumentOwner = async (req_user, document_id) => {
  const user = await fetchUser(req_user);
  const document = await findDoc(document_id, true);
  if (!document) return null;

  return user._id.equals(document.userId);
};
