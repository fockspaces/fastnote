const Note = require("../models/Note");

const getNotes = async (req, res) => {
  const offset = 10;
  const { paging } = req.query;
  const notes = await Note.find()
    .sort({ createdAt: -1 })
    .skip(paging ? parseInt(paging) * offset : 0)
    .limit(offset);
  res.status(200).json({ data: notes });
};

const getNote = async (req, res) => {
  const { document_id } = req.params;

  const note = await Note.findById(document_id);

  if (!note) {
    return res.status(404).json({ error: "Note not found" });
  }

  return res.json({ data: note });
};

const postNotes = async (req, res) => {
  const { document_id, title, paragraph, tags } = req.body;

  // If document ID is provided, update the existing document
  if (document_id) {
    const note = await Note.findById(document_id);

    if (!note) {
      return res.status(400).json({ error: "Document not found" });
    }

    if (paragraph) note.paragraphs.push({ text: paragraph });
    if (tags) note.tags.push(...tags);
    note.updatedAt = new Date();

    await note.save();

    return res.json({ data: "Note updated successfully" });
  }

  // If title is provided, create a new document
  if (title) {
    const note = new Note({
      title,
      paragraphs: [{ text: paragraph }],
      tags: tags || [],
    });

    await note.save();

    return res.json({ data: "Note created successfully" });
  }

  return res.status(400).json({ error: "Missing required fields" });
};

module.exports = { getNotes, postNotes, getNote };
