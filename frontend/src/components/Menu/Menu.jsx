import "../../styles/menu.scss";
import React, { useState } from "react";
import { Link } from "react-router-dom";

import {
  FaHeart,
  FaTrash,
  FaUser,
  FaHome,
  FaSignOutAlt,
  FaChevronLeft,
  FaChevronRight,
  FaListUl,
} from "react-icons/fa";
import { IoCreate } from "react-icons/io5";
import CreateConfirmModal from "./utils/CreateConfirmModal";
const user = localStorage.getItem("user");

function Menu({ menuOpen, setMenuOpen }) {
  const [showModal, setShowModal] = useState(false);

  const handleCollapse = (toggle) => {
    if (toggle) return setMenuOpen((prevState) => !prevState);
    setMenuOpen(false);
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("access_token");
    window.location.href = "/";
  };

  const handleCreate = () => {
    setShowModal(true);
    handleCollapse();
  };

  return (
    <div className="menu-wrapper">
      <nav className={`menu ${menuOpen ? "" : "collapsed"}`}>
        <div
          className="collapse-btn"
          onClick={() => {
            handleCollapse(true);
          }}
        >
          {menuOpen ? <FaChevronLeft /> : <FaChevronRight />}
        </div>
        <ul>
          <li onClick={user ? handleCreate : null}>
            <Link  className={`nav-link ${!user ? "disabled" : ""}`}>
              <IoCreate />
              <span>New</span>
            </Link>
          </li>
          <li
            onClick={() => {
              handleCollapse();
            }}
          >
            <Link to="/documents" className={`nav-link ${!user ? "disabled" : ""}`}>
              <FaListUl />
              <span>Notes</span>
            </Link>
          </li>
          <li
            onClick={() => {
              handleCollapse();
            }}
          >
            <Link to="/favorites" className={`nav-link ${!user ? "disabled" : ""}`}>
              <FaHeart />
              <span>Favorites</span>
            </Link>
          </li>
          <li
            onClick={() => {
              handleCollapse();
            }}
          >
            <Link to="/trash" className={`nav-link ${!user ? "disabled" : ""}`}>
              <FaTrash />
              <span>Trash</span>
            </Link>
          </li>
          <li
            onClick={() => {
              handleCollapse();
            }}
          >
            <Link to="/profile" className={`nav-link ${!user ? "disabled" : ""}`}>
              <FaUser />
              <span>Profile</span>
            </Link>
          </li>
          <li
            onClick={() => {
              handleCollapse();
            }}
          >
            <Link to="/" className={`nav-link ${!user ? "disabled" : ""}`}>
              <FaHome />
              <span>Home</span>
            </Link>
          </li>
          <li onClick={handleLogout}>
            <Link to="/logout" className={`nav-link ${!user ? "disabled" : ""}`}>
              <FaSignOutAlt />
              <span>Logout</span>
            </Link>
          </li>
        </ul>
      </nav>
      <CreateConfirmModal showModal={showModal} setShowModal={setShowModal} />
    </div>
  );
}

export default Menu;
