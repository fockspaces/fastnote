import React from "react";

function NoteList({ setSelectedNote, notes }) {
  return (
    <div className="note-list">
      <ul>
        {notes.map((note, idx) => (
          <li key={idx} onClick={() => setSelectedNote(note)}>
            {note.title}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default NoteList;
