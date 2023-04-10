import React, { useEffect, useState } from "react";

function NoteList({ setSelectedNote, notes, deleteNote }) {
  return (
    <div className="note-list">
      <ul>
        {notes.map((note) => (
          <li
            key={note.id}
            onClick={() => {
              setSelectedNote(note);
            }}
          >
            {note.title}
            <button
              onClick={(e) => {
                deleteNote(note);
                e.stopPropagation();
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
