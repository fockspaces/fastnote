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
import { fetchDocuments } from "../../../api/documents/fetchDocuments";

function List({
  notes,
  setSelectedNote,
  createNote,
  deleteNote,
  selectedNote,
  toggleModal,
  document_id,
}) {
  const [showModal, setShowModal] = useState(false);
  const [currentNotes, setCurrentNotes] = useState(notes);
  const [keyword, setKeyword] = useState("");
  console.log(keyword);

  useEffect(() => {
    const fetchData = async () => {
      const result = await fetchDocuments("?is_trash=false" + keyword);
      setCurrentNotes(result.map((doc) => doc.paragraphs[0]));
    };
    fetchData();
  }, [keyword]);

  return (
    <div className="list">
      <div className="list__header">
        {/* <CreateNote createNote={createNote} /> */}
        <SearchBar setKeyword={setKeyword} setTagging={() => {}} />
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
