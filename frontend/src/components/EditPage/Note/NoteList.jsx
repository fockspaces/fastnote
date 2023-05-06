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
  return (
    <div className="note-list mt-3">
      <ListGroup>
        {notes.length === 0 ? (
          <div className="hint-text">
            List is empty, please create a new note to start.
          </div>
        ) : (
          notes.map((note, idx) => (
            <NoteListItem
              key={idx}
              note={note}
              selectedNote={selectedNote}
              setSelectedNote={setSelectedNote}
              deleteNote={deleteNote}
              toggleModal={toggleModal}
            />
          ))
        )}
      </ListGroup>
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
          navigate(`/document/${note.document_id}`);
        }
      }}
    >
      <div className="d-flex justify-content-between align-items-center">
        <div className="title-container">
          <div className="note-title">{note.title}</div>
          <div className="updated-at">
            {note.updatedAt &&
              new Intl.DateTimeFormat(undefined, {
                month: "numeric",
                day: "numeric",
                hour: "numeric",
                minute: "numeric",
                hour12: true,
              }).format(new Date(note.updatedAt))}
          </div>
        </div>
        {/* <OverlayTrigger placement="bottom" overlay={deleteTooltip}>
          <div
            className="delete-icon"
            onClick={(e) => {
              e.stopPropagation();
              setShowModal(true);
            }}
          >
            <FaTrash size={20} />
          </div>
        </OverlayTrigger> */}
      </div>
      {/* <ConfirmModal
        showModal={showModal}
        setShowModal={setShowModal}
        handleConfirmDelete={handleDeleteNote}
        message={message}
      /> */}
    </ListGroup.Item>
  );
}

export default NoteList;
