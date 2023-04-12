import "./styles/app.scss";
import React from "react";
import { Routes, Route } from "react-router-dom";

import EditPage from "./pages/EditPage";
import ListPage from "./pages/ListPage";

import OAuth from "./components/Auth/OAuth";
import { NotFound } from "./pages/NotFound";

function App() {
  return (
    <div className="App">
      <OAuth />
      <Routes>
        <Route path="/document" element={<ListPage />}></Route>
        <Route path="/document/:document_id" element={<EditPage />}></Route>
        <Route path="*" element={<NotFound />}></Route>
      </Routes>
    </div>
  );
}

export default App;
