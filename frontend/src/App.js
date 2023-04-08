import "./styles/app.scss";
import React, { useState } from "react";
import Note from "./components/Note/Note";
import List from "./containers/List";

function App() {
  const [selectedNote, setSelectedNote] = useState(null);

  return (
    <div className="App">
      <List setSelectedNote={setSelectedNote} />
      <Note selectedNote={selectedNote} />
    </div>
  );
}

export default App;
