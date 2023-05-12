import React, { useState } from "react";
import { ListGroup, OverlayTrigger, Tooltip } from "react-bootstrap";
import { FaTrash } from "react-icons/fa";
import ConfirmModal from "../../ListPage/utils/ConfirmModal";
import { useNavigate, useParams } from "react-router-dom";

function NoteList({
  setSelectedNote,
  notes,
  deleteNote,
  selectedNote,
  toggleModal,
}) {
  const filterNotesByDate = (minDays, maxDays) => {
    const now = new Date();
    // Set the time part of the date object to 0 to only compare the date part
    now.setHours(0, 0, 0, 0);

    return notes.filter((note) => {
      if (!note) return false;
      const updatedAt = new Date(note.updatedAt);
      updatedAt.setHours(0, 0, 0, 0);
      const daysDifference = (now - updatedAt) / (1000 * 60 * 60 * 24);
      return daysDifference >= minDays && daysDifference < maxDays;
    });
  };

  const renderNotesByDate = (minDays, maxDays, title) => {
    const filteredNotes = filterNotesByDate(minDays, maxDays);
    if (filteredNotes.length === 0) {
      return null;
    }

    return (
      <div className="mt-3">
        <ListGroup>
          <p className="date-title">{title}</p>
          {filteredNotes.map((note, idx) => (
            <NoteListItem
              key={idx}
              note={note}
              selectedNote={selectedNote}
              setSelectedNote={setSelectedNote}
              deleteNote={deleteNote}
              toggleModal={toggleModal}
            />
          ))}
        </ListGroup>
      </div>
    );
  };

  return (
    <div className="note-list mt-3">
      {renderNotesByDate(0, 1, "Today")}
      {renderNotesByDate(1, 2, "Yesterday")}
      {renderNotesByDate(2, 7, "Past Week")}
      {renderNotesByDate(7, Infinity, "Over a Week")}
    </div>
  );
}

function NoteListItem({
  note,
  setSelectedNote,
  selectedNote,
  deleteNote,
  toggleModal,
}) {
  // const isSelected = note._id === selectedNote._id;
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();
  const { document_id } = useParams();

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

  const deleteTooltip = <Tooltip>Delete Chapter</Tooltip>;
  // console.log({ note });
  return (
    <ListGroup.Item
      className={`mt-2`}
      action
      onClick={() => {
        toggleModal();
        // go to edit page
        if (document_id !== note.document_id) {
          window.location.href = `/document/${note.document_id}`;
        }
      }}
    >
      <div className="d-flex justify-content-between align-items-center">
        <div className="title-container">
          <div className="note-title">{note.title}</div>
          <div className="updated-at">
            {note.updatedAt &&
              new Intl.DateTimeFormat(undefined, {
                month: "short",
                day: "numeric",
                hour: "numeric",
                minute: "numeric",
                hour12: true,
              }).format(new Date(note.updatedAt))}
          </div>
        </div>
      </div>
    </ListGroup.Item>
  );
}

export default NoteList;
