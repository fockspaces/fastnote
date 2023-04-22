import "./styles/app.scss";
import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";

import EditPage from "./pages/EditPage";
import ListPage from "./pages/ListPage";

import OAuth from "./components/OAuth/OAuth";
import NotFound from "./pages/functionPage/NotFound";
import Menu from "./components/Menu/Menu";
import FavoritePage from "./pages/FavoritePage";
import TrashPage from "./pages/TrashPage";
import HomePage from "./pages/HomePage";
import ProfilePage from "./pages/ProfilePage";
import IntroductionPage from "./pages/IntroductionPage";

function App() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="App">
      <OAuth />
      <Menu setMenuOpen={setMenuOpen} menuOpen={menuOpen} />
      <div className={`content ${menuOpen ? "menu-expanded" : ""}`}>
        <Routes>
          <Route path="/" element={<IntroductionPage />}></Route>
          <Route path="/documents" element={<ListPage />}></Route>
          <Route path="/favorites" element={<FavoritePage />}></Route>
          <Route path="/trash" element={<TrashPage />}></Route>
          <Route path="/profile" element={<ProfilePage />}></Route>
          <Route path="/document/:document_id" element={<EditPage />}></Route>
          <Route path="*" element={<NotFound />}></Route>
        </Routes>
      </div>
    </div>
  );
}

export default App;