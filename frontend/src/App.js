import "./styles/app.scss";
import React, { useState, useEffect } from "react";
import EditPage from "./containers/EditPage";

import OAuth from "./components/Auth/OAuth";
import { fetchDocument } from "./api/fetchDocument";

function App() {
  // todo : fetch the listing document with API
  const [document, setDocument] = useState({ paragraphs: [] });

  useEffect(() => {
    const fetchDoc = async () => {
      const documentId = "64329e5fe0b78d6f8cb1b7ae";
      const fetchedDocument = await fetchDocument(documentId);
      setDocument(fetchedDocument);
    };
    fetchDoc();
  }, []);

  return (
    <div className="App">
      <EditPage document={document} />
      <OAuth />
    </div>
  );
}

export default App;
