import React, { useState, useEffect } from "react";
import Tiptap from "../Editor/Tiptap";
import NotePreview from "./NotePreview";

function Note({ selectedNote, updateSelectedNote }) {
  const [content, setContent] = useState(selectedNote.content);

  // useEffect to save note
  useEffect(() => {
    updateSelectedNote(content);
  }, [content]);

  if (!selectedNote.content) {
    return <NotePreview />;
  }
  return (
    <div className="note">
      <div className="container">
        <Tiptap note={selectedNote} setContent={setContent} />
      </div>
    </div>
  );
}

export default Note;
