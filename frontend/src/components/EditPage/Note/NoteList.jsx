import React, { useState } from "react";
import { ListGroup } from "react-bootstrap";
import { FaTrash } from "react-icons/fa";
import ConfirmModal from "../../ListPage/utils/ConfirmModal";

function NoteList({ setSelectedNote, notes, deleteNote, selectedNote }) {
  return (
    <div className="note-list mt-3">
      <ListGroup>
        {notes.map((note, idx) => (
          <NoteListItem
            key={idx}
            note={note}
            selectedNote={selectedNote}
            setSelectedNote={setSelectedNote}
            deleteNote={deleteNote}
          />
        ))}
      </ListGroup>
    </div>
  );
}

function NoteListItem({ note, setSelectedNote, selectedNote, deleteNote }) {
  const isSelected = note._id === selectedNote._id;
  const [showModal, setShowModal] = useState(false);
  const message = {
    title: "Confirm Delete Note",
    body: "Are you sure to delete this note?",
    confirm: "Delete",
  };

  const handleDeleteNote = (e) => {
    deleteNote(note);
    e.stopPropagation();
    setShowModal(false);
  };

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
        <span
          onClick={() => {
            setShowModal(true);
          }}
        >
          <FaTrash />
        </span>
      </div>
      <ConfirmModal
        showModal={showModal}
        setShowModal={setShowModal}
        handleConfirmDelete={handleDeleteNote}
        message={message}
      />
    </ListGroup.Item>
  );
}

export default NoteList;
