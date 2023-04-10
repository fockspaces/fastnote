import React from "react";
import { ListGroup, Button } from "react-bootstrap";

function NoteList({ setSelectedNote, notes, deleteNote }) {
  const handleDeleteNote = (note, e) => {
    deleteNote(note);
    e.stopPropagation();
  };

  return (
    <div className="note-list mt-3">
      <ListGroup>
        {notes.map((note) => (
          <NoteListItem
            key={note.id}
            note={note}
            setSelectedNote={setSelectedNote}
            handleDeleteNote={handleDeleteNote}
          />
        ))}
      </ListGroup>
    </div>
  );
}

function NoteListItem({ note, setSelectedNote, handleDeleteNote }) {
  return (
    <ListGroup.Item
    className="mt-2"
      action
      onClick={() => {
        setSelectedNote(note);
      }}
    >
      <div className="d-flex justify-content-between align-items-center">
        <div className="title-container">
          <span>{note.title}</span>
        </div>
        <span
          className="btn btn-outline-danger"
          onClick={(e) => handleDeleteNote(note, e)}
        >
          X
        </span>
      </div>
    </ListGroup.Item>
  );
}

export default NoteList;
