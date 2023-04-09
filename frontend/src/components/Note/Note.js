import React, { useState } from "react";
import Tiptap from "../Editor/Tiptap";
import NotePreview from "./NotePreview";

function Note({ selectedNote }) {
  const [content, setContent] = useState(selectedNote.content);
  if (!selectedNote.content) {
    return <NotePreview />;
  }

  // todo : useEffect to save note

  return (
    <div className="note">
      <div className="container">
        <Tiptap note={selectedNote} setContent={setContent} />
      </div>
    </div>
  );
}

export default Note;
