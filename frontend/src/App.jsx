import "./styles/app.scss";
import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";

import EditPage from "./pages/EditPage";
import ListPage from "./pages/ListPage";

import OAuth from "./components/OAuth/OAuth";
import { NotFound } from "./pages/functionPage/NotFound";
import { HomePage } from "./pages/HomePage";
import Menu from "./components/Menu/Menu";

function App() {
  const [menuOpen, setMenuOpen] = useState(true);

  return (
    <div className="App">
      <OAuth />
      <Menu setMenuOpen={setMenuOpen} menuOpen={menuOpen} />
      <div className={`content ${menuOpen ? "menu-expanded" : ""}`}>
        <Routes>
          <Route path="/" element={<HomePage />}></Route>
          <Route path="/document" element={<ListPage />}></Route>
          <Route path="/document/:document_id" element={<EditPage />}></Route>
          <Route path="*" element={<NotFound />}></Route>
        </Routes>
      </div>
    </div>
  );
}

export default App;
