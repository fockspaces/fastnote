import express from "express";
import { verifyUser } from "../middleware/Authentication.js";
import {
  getAllDocuments,
  getDocumentDetail,
  createDocument,
  deleteDocument,
  updateDocument,
  summarizeDocument,
  getAllTags,
  updateTagName,
} from "../controllers/documents.js";
import { catchAsync } from "../utils/errorHandling.js";
import { validateObjectId } from "../middleware/validateObjectId.js";

const document = express.Router();

document.use(verifyUser);
document
  .route("/")
  .get(catchAsync(getAllDocuments))
  .post(catchAsync(createDocument));

document
  .route("/tags")
  .get(catchAsync(getAllTags))
  .patch(catchAsync(updateTagName));

document
  .route("/:document_id")
  .all(validateObjectId)
  .get(catchAsync(getDocumentDetail))
  .post(catchAsync(updateDocument))
  .delete(catchAsync(deleteDocument));

document
  .route("/:document_id/summary")
  .post(validateObjectId, catchAsync(summarizeDocument));

export default document;
