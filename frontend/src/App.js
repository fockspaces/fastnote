import "./styles/app.scss";
import React from "react";
import { Routes, Route } from "react-router-dom";

import EditPage from "./pages/EditPage";
import ListPage from "./pages/ListPage";

import OAuth from "./components/OAuth/OAuth";
import { NotFound } from "./pages/NotFound";
import { HomePage } from "./pages/HomePage";

function App() {
  return (
    <div className="App">
      <OAuth />
      <Routes>
        <Route path="/" element={<HomePage />}></Route>
        <Route path="/document" element={<ListPage />}></Route>
        <Route path="/document/:document_id" element={<EditPage />}></Route>
        <Route path="*" element={<NotFound />}></Route>
      </Routes>
    </div>
  );
}

export default App;
