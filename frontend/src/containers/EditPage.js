import { useState } from "react";
import List from "./List";
import Note from "../components/Note/Note";
import { updateNote } from "../utils/noteHelper";

const EditPage = ({ document }) => {
  const [currentDoc, setCurrentDoc] = useState(document);
  const [selectedNote, setSelectedNote] = useState({ content: null });

  const updateSelectedNote = (content) => {
    if (!content) return;
    const newNote = updateNote(selectedNote, content);
    const updatedParagraphs = currentDoc.paragraphs.map((paragraph) => {
      return paragraph._id === selectedNote._id ? newNote : paragraph;
    });
    setCurrentDoc({ ...currentDoc, paragraphs: updatedParagraphs });
  };

  return (
    <>
      <List notes={currentDoc.paragraphs} setSelectedNote={setSelectedNote} />
      <Note
        selectedNote={selectedNote}
        updateSelectedNote={updateSelectedNote}
      />
    </>
  );
};

export default EditPage;
