import "./styles/app.scss";
import React, { useState } from "react";
import EditPage from "./containers/Editor";

import { document } from "./utils/content";

function App() {
  return (
    <div className="App">
      <EditPage document={document}/>
    </div>
  );
}

export default App;
