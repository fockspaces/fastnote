import './styles/app.scss'
import React, { useState } from "react";
import Sidebar from "./components/Sidebar/Sidebar";
import Note from "./components/Note/Note";

function App() {
  const [selectedNote, setSelectedNote] = useState(null);

  return (
    <div className="App">
      <Sidebar setSelectedNote={setSelectedNote} />
      <Note selectedNote={selectedNote} />
    </div>
  );
}

export default App;
