const express = require("express");
const note = express.Router();
const { getNotes, postNotes, getNote } = require("../controllers/notes");
const { catchAsync } = require("../utils/errorHandling");

note.route("/").get(catchAsync(getNotes)).post(catchAsync(postNotes));
note.route("/:document_id").get(catchAsync(getNote));

module.exports = note;
