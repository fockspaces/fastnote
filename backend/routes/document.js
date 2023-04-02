import express from "express";
import { verifyUser } from "../middleware/Authentication.js";
import {
  getAllDocuments,
  getDocumentDetail,
  handleDocument,
} from "../controllers/documents.js";
import { catchAsync } from "../utils/errorHandling.js";

const document = express.Router();
document
  .route("/")
  .get(verifyUser, catchAsync(getAllDocuments))
  .post(verifyUser, catchAsync(handleDocument));
document.route("/:document_id").get(verifyUser, catchAsync(getDocumentDetail));

export default document;
