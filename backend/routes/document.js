import express from "express";
import { verifyUser } from "../middleware/Authentication.js";
import {
  getAllDocuments,
  getDocumentDetail,
  handleDocument,
  deleteDocument,
} from "../controllers/documents.js";
import { catchAsync } from "../utils/errorHandling.js";

const document = express.Router();

document.use(verifyUser);
document
  .route("/")
  .get(catchAsync(getAllDocuments))
  .post(catchAsync(handleDocument));

document
  .route("/:document_id")
  .get(catchAsync(getDocumentDetail))
  .delete(catchAsync(deleteDocument));

export default document;
