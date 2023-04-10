import "../styles/_List.scss";
import React, { useState } from "react";
import NoteList from "../components/Note/NoteList";
import ToListPage from "../components/Button/ToListPage";
import { CreateNote } from "../components/Button/CreateNote";

function List({ notes, setSelectedNote, createNote, deleteNote }) {
  return (
    <div className="list">
      <ToListPage />
      <CreateNote createNote={createNote} />
      <NoteList
        setSelectedNote={setSelectedNote}
        notes={notes}
        deleteNote={deleteNote}
      />
    </div>
  );
}

export default List;
