import "./styles/app.scss";
import React, { useState } from "react";
import EditPage from "./containers/EditPage";

import { document } from "./utils/content";
import OAuth from "./components/Auth/OAuth";

function App() {
  // todo : fetch the listing document with API

  return (
    <div className="App">
      <EditPage document={document} />
      <OAuth />
    </div>
  );
}

export default App;
