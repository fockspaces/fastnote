import React from "react";
import NoteList from "../Note/NoteList";
import ToListPage from "../../Button/ToListPage";
import { CreateNote } from "../../Button/CreateNote";
import { Button } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";
import { AiFillTags } from "react-icons/ai";
import { generateTags } from "../../../utils/noteHelper";
import { updateDoc } from "../../../api/documents/updateDocument";

function List({
  notes,
  setSelectedNote,
  createNote,
  deleteNote,
  selectedNote,
  setCurrentDoc,
}) {
  const { document_id } = useParams();
  const handleTags = async (notes) => {
    const tags = await generateTags(notes);
    setCurrentDoc((currentDoc) => {
      return { ...currentDoc, tags };
    });
    await updateDoc({ document_id, tags });
    alert("generate tags succeesfully!");
  };

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
        />
      </div>
      <div className="list__footer">
        <Link>
          <Button
            variant="outline-dark"
            onClick={() => {
              handleTags(notes);
            }}
          >
            <AiFillTags /> Genterate Tags
          </Button>
        </Link>
      </div>
    </div>
  );
}

export default List;
