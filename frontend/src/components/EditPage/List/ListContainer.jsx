import "../../../styles/EditPage/listContainer.scss";
import React, { useState } from "react";
import NoteList from "../Note/NoteList";
import ToListPage from "./ToListPage";
import { CreateNote } from "./CreateNote";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { IoBarcodeOutline } from "react-icons/io5";
import SummarizeModal from "./utils/SummarizeModal";

function List({
  notes,
  setSelectedNote,
  createNote,
  deleteNote,
  selectedNote,
  toggleModal,
}) {
  const [showModal, setShowModal] = useState(false);

  return (
    <div className="list">
      <div className="list__header">
        <ToListPage />
        <CreateNote createNote={createNote} />
      </div>
      <div className="list__body">
        <NoteList
          selectedNote={selectedNote}
          setSelectedNote={setSelectedNote}
          notes={notes}
          deleteNote={deleteNote}
          toggleModal={toggleModal}
        />
      </div>
      <div className="list__footer">
        <Link>
          <Button
            variant="outline-dark"
            onClick={() => {
              setShowModal(true);
            }}
          >
            <IoBarcodeOutline /> Summarize
          </Button>
        </Link>
      </div>
      <SummarizeModal
        notes={notes}
        showModal={showModal}
        setShowModal={setShowModal}
      />
    </div>
  );
}

export default List;
