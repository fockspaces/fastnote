import React from "react";

function NoteList({ setSelectedNote }) {
  const notes = [
    {
      id: "1",
      title: "Note 1",
      tags: ["tag1", "tag2"],
      content: "This is the content of note 1",
    },
    {
      id: "2",
      title: "Note 2",
      tags: ["tag3"],
      content: "This is the content of note 2",
    },
  ];

  return (
    <div className="note-list">
      <h2>Notes</h2>
      <ul>
        {notes.map((note) => (
          <li key={note.id} onClick={() => setSelectedNote(note)}>
            {note.title}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default NoteList;
