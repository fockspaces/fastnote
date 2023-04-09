import React, { useState } from "react";
import Tiptap from "../Editor/Tiptap";

function Note({ selectedNote }) {
  const [content, setContent] = useState(selectedNote.content);
  if (!selectedNote.content) {
    return <div className="note-preview">Select a note to view</div>;
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
