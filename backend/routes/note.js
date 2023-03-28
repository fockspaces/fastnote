const express = require("express");
const note = express.Router();
const { getNotes, postNotes } = require("../controllers/notes");

note.route("/notes").get(getNotes).post(postNotes);

module.exports = note;
