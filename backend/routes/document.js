const express = require("express");
const note = express.Router();
const {
  getAllDocuments,
  getDocumentDetail,
  createOrUpdateDocument,
} = require("../controllers/documents");
const { catchAsync } = require("../utils/errorHandling");

note
  .route("/")
  .get(catchAsync(getAllDocuments))
  .post(catchAsync(createOrUpdateDocument));
note.route("/:document_id").get(catchAsync(getDocumentDetail));

module.exports = note;
