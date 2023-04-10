import React, { useState, useEffect } from "react";
import Tiptap from "../Editor/Tiptap";
import NotePreview from "./NotePreview";
import { updateNote } from "../../utils/noteHelper";

function Note({ selectedNote, setCurrentDoc }) {
  const [content, setContent] = useState(selectedNote.content);
  // update note and save to doc
  useEffect(() => {
    const updateSelectedNote = () => {
      if (!content || !selectedNote.id) return;
      const newNote = updateNote(selectedNote, content);
      setCurrentDoc((currentDoc) => {
        const updatedParagraphs = currentDoc.paragraphs.map((paragraph) => {
          return paragraph.id === selectedNote.id ? newNote : paragraph;
        });
        return { ...currentDoc, paragraphs: updatedParagraphs };
      });
    };

    updateSelectedNote();
  }, [content]);

  if (selectedNote.preview) return <NotePreview />;

  return (
    <div className="note">
      <div className="container">
        <Tiptap note={selectedNote} setContent={setContent} />
      </div>
    </div>
  );
}

export default Note;
