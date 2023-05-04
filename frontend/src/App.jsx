import "./styles/app.scss";
import React, { useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import EditPage from "./pages/EditPage";
import ListPage from "./pages/ListPage";

import OAuth from "./components/OAuth/OAuth";
import NotFound from "./pages/functionPage/NotFound";
import Menu from "./components/Menu/Menu";
import FavoritePage from "./pages/FavoritePage";
import TrashPage from "./pages/TrashPage";
import ProfilePage from "./pages/ProfilePage";
import IntroductionPage from "./pages/IntroductionPage";
const user = localStorage.getItem("user");

function App() {
  const [menuOpen, setMenuOpen] = useState(false);

  const ProtectedRoute = ({ user, redirectPath = "/", children }) => {
    if (!user) {
      return <Navigate to={redirectPath} replace />;
    }
    return children;
  };

  return (
    <div className="App">
      <OAuth />
      <Menu setMenuOpen={setMenuOpen} menuOpen={menuOpen} />{" "}
      <div className={`content ${menuOpen ? "menu-expanded" : ""}`}>
        <Routes>
          <Route path="/" element={<IntroductionPage />}></Route>
          <Route
            path="/documents"
            element={
              <ProtectedRoute user={user}>
                <ListPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/favorites"
            element={
              <ProtectedRoute user={user}>
                <FavoritePage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/trash"
            element={
              <ProtectedRoute user={user}>
                <TrashPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/profile"
            element={
              <ProtectedRoute user={user}>
                <ProfilePage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/document/:document_id"
            element={
              <ProtectedRoute user={user}>
                <EditPage />
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
