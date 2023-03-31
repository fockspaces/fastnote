import express from "express";
import AuthUser from "../middleware/AuthUser.js";

import {
  getAllDocuments,
  getDocumentDetail,
  createOrUpdateDocument,
} from "../controllers/documents.js";
import { catchAsync } from "../utils/errorHandling.js";

const document = express.Router();
document
  .route("/")
  .get(AuthUser, catchAsync(getAllDocuments))
  .post(AuthUser, catchAsync(createOrUpdateDocument));
document.route("/:document_id").get(AuthUser, catchAsync(getDocumentDetail));

export default document;
