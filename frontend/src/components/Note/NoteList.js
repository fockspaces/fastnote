import React from "react";

function NoteList({ setSelectedNote, notes, deleteNote }) {
  return (
    <div className="note-list">
      <ul>
        {notes.map((note, idx) => (
          <li
            key={note.id}
            onClick={() => {
              setSelectedNote(note);
            }}
          >
            {note.title}
            <button
              onClick={() => {
                deleteNote(note);
              }}
            >
              delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default NoteList;
