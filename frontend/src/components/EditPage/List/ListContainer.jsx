import "../../../styles/EditPage/listContainer.scss";
import React, { useState, useEffect } from "react";
import NoteList from "../Note/NoteList";
import ToListPage from "./ToListPage";
import { CreateNote } from "./CreateNote";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { IoBarcodeOutline } from "react-icons/io5";
import SummarizeModal from "./utils/SummarizeModal";
import SearchBar from "../../ListPage/utils/SearchBar";

function List({
  notes,
  setSelectedNote,
  createNote,
  deleteNote,
  selectedNote,
  toggleModal,
}) {
  const [showModal, setShowModal] = useState(false);
  const [currentNotes, setCurrentNotes] = useState(notes);

  useEffect(() => {
    setCurrentNotes(notes);
  }, [notes]);

  const handleSearch = (keyword) => {
    const searchTerm = keyword.substring(9);
    const filteredNotes = notes.filter((note) =>
      note.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setCurrentNotes(filteredNotes);
  };

  return (
    <div className="list">
      <div className="list__header">
        <CreateNote createNote={createNote} />
        <SearchBar setKeyword={handleSearch} setTagging={() => {}} />
      </div>
      <div className="list__body">
        <NoteList
          selectedNote={selectedNote}
          setSelectedNote={setSelectedNote}
          notes={currentNotes}
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
