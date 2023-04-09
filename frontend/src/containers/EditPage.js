import { useState } from "react";
import List from "./List";
import Note from "../components/Note/Note";

const EditPage = ({ document }) => {
  const [selectedNote, setSelectedNote] = useState({ content: null });

  return (
    <>
      <List notes={document.notes} setSelectedNote={setSelectedNote} />
      <Note selectedNote={selectedNote} />
    </>
  );
};

export default EditPage;
