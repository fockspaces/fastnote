import "../../styles/_Note.scss";
import React, { useState, useEffect } from "react";
import Tiptap from "../Editor/Tiptap";
import NotePreview from "./NotePreview";

function Note({ selectedNote, updateSelectedNote }) {
  const [content, setContent] = useState(selectedNote.content);

  // useEffect to save note
  useEffect(() => {
    if (selectedNote.content !== content) {
      updateSelectedNote(content);
    }
  }, [content, selectedNote.content, updateSelectedNote]);

  return (
    <div className="note">
      <div className="container">
        {selectedNote.title ? (
          <Tiptap note={selectedNote} setContent={setContent} />
        ) : (
          <NotePreview />
        )}
      </div>
    </div>
  );
}

export default Note;
