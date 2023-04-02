import express from "express";
import { verifyGoogle } from "../middleware/Authentication.js";
import {
  getAllDocuments,
  getDocumentDetail,
  handleDocument,
} from "../controllers/documents.js";
import { catchAsync } from "../utils/errorHandling.js";

const document = express.Router();
document
  .route("/")
  .get(verifyGoogle, catchAsync(getAllDocuments))
  .post(verifyGoogle, catchAsync(handleDocument));
document
  .route("/:document_id")
  .get(verifyGoogle, catchAsync(getDocumentDetail));

export default document;
