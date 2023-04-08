import React, { useState } from "react";
import Tiptap from "../Editor/Tiptap";
import { data } from "../../utils/content";

function Note({ selectedNote }) {
  const [content, setContent] = useState(data);
  if (!selectedNote) {
    return <div className="note-preview">Select a note to view</div>;
  }

  return (
    <div className="note">
      <h2>{selectedNote.title}</h2>
      <ul>
        {selectedNote.tags.map((tag) => (
          <li key={tag}>{tag}</li>
        ))}
      </ul>
      <div className="container">
        <Tiptap content={content} setContent={setContent} />
      </div>
    </div>
  );
}

export default Note;
