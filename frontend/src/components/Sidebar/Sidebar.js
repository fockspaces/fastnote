import "../../styles/_sidebar.scss";
import React from "react";
import NoteList from "../Note/NoteList";
import NoteForm from "../Note/NoteForm";

function Sidebar({ setSelectedNote }) {
  return (
    <div className="sidebar">
      <NoteList setSelectedNote={setSelectedNote} />
      <NoteForm />
    </div>
  );
}

export default Sidebar;
