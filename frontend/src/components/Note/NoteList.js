import React from "react";
import { ListGroup } from "react-bootstrap";
import { FaTrash } from "react-icons/fa";

function NoteList({ setSelectedNote, notes, deleteNote, selectedNote }) {
  const handleDeleteNote = (note, e) => {
    deleteNote(note);
    e.stopPropagation();
  };

  return (
    <div className="note-list mt-3">
      <ListGroup>
        {notes.map((note, idx) => (
          <NoteListItem
            key={idx}
            note={note}
            selectedNote={selectedNote}
            setSelectedNote={setSelectedNote}
            handleDeleteNote={handleDeleteNote}
          />
        ))}
      </ListGroup>
    </div>
  );
}

function NoteListItem({
  note,
  setSelectedNote,
  handleDeleteNote,
  selectedNote,
}) {
  const isSelected = note.id === selectedNote?.id;

  return (
    <ListGroup.Item
      className={`mt-2 ${isSelected ? "selected" : ""}`}
      action
      onClick={() => {
        setSelectedNote(note);
      }}
    >
      <div className="d-flex justify-content-between align-items-center">
        <div className="title-container">
          <span>{note.title}</span>
        </div>
        <span onClick={(e) => handleDeleteNote(note, e)}>
          <FaTrash />
        </span>
      </div>
    </ListGroup.Item>
  );
}

export default NoteList;
