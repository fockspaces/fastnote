import "../styles/_List.scss";
import React, { useState } from "react";
import NoteList from "../components/Note/NoteList";
import TextSearch from "../components/Search/TextSearch";

function List({ notes, setSelectedNote }) {
  const [term, setTerm] = useState("");

  // todo : fetch the matching notes with API

  return (
    <div className="list">
      <TextSearch setTerm={setTerm} />
      <NoteList setSelectedNote={setSelectedNote} notes={notes} />
    </div>
  );
}

export default List;
