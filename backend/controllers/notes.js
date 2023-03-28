const Note = require("../models/Note");

const getNotes = async (req, res) => {
  try {
    const { paging } = req.query;
    const notes = await Note.find()
      .sort({ createdAt: -1 })
      .skip(paging ? parseInt(paging) * 10 : 0)
      .limit(10);
    res.status(200).json({ data: notes });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Server error" });
  }
};

const postNotes = async (req, res) => {
  const { document, title, paragraph } = req.body;

  // If document ID is provided, update the existing document
  if (document) {
    const note = await Note.findById(document);

    if (!note) {
      return res.status(400).json({ error: "Document not found" });
    }

    note.paragraphs.push({ text: paragraph });
    note.updatedAt = new Date();

    await note.save();

    return res.json({ data: "Note updated successfully" });
  }

  // If title is provided, create a new document
  if (title) {
    const note = new Note({
      title,
      paragraphs: [{ text: paragraph }],
    });

    await note.save();

    return res.json({ data: "Note created successfully" });
  }

  return res.status(400).json({ error: "Missing required fields" });
};

module.exports = { getNotes, postNotes };
