import "../styles/_List.scss";
import React, { useState } from "react";
import NoteList from "../components/Note/NoteList";
import ToListPage from "../components/Button/ToListPage";

function List({ notes, setSelectedNote }) {
  return (
    <div className="list">
      <ToListPage />
      <NoteList setSelectedNote={setSelectedNote} notes={notes} />
    </div>
  );
}

export default List;
