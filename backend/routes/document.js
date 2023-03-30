import express from "express";
import {
  getAllDocuments,
  getDocumentDetail,
  createOrUpdateDocument,
} from "../controllers/documents.js";
import { catchAsync } from "../utils/errorHandling.js";

const document = express.Router();
document
  .route("/")
  .get(catchAsync(getAllDocuments))
  .post(catchAsync(createOrUpdateDocument));
document.route("/:document_id").get(catchAsync(getDocumentDetail));

export default document;
