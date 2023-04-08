import "../styles/_List.scss";
import React, { useState } from "react";
import NoteList from "../components/Note/NoteList";
import TextSearch from "../components/Search/TextSearch";

function List({ setSelectedNote }) {
  const [notes, setNotes] = useState([
    {
      id: "1",
      title: "Note 1",
      tags: ["tag1", "tag2"],
      content: "This is the content of note 1",
    },
    {
      id: "2",
      title: "Note 2",
      tags: ["tag3"],
      content: "This is the content of note 2",
    },
  ]);
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
