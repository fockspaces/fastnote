import "./styles/app.scss";
import React, { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";

import EditPage from "./pages/EditPage";
import ListPage from "./pages/ListPage";

import OAuth from "./components/Auth/OAuth";

function App() {
  return (
    <div className="App">
      <OAuth />
      <Routes>
        <Route path="/document" element={<ListPage />}></Route>
        <Route path="/document/:id" element={<EditPage />}></Route>
      </Routes>
    </div>
  );
}

export default App;
