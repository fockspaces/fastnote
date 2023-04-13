import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  FaPlus,
  FaHeart,
  FaTrash,
  FaUser,
  FaHome,
  FaStickyNote,
  FaSignOutAlt,
  FaChevronLeft,
  FaChevronRight,
} from "react-icons/fa";
import "../../styles/menu.scss";

function Menu({ menuOpen, setMenuOpen }) {
  const handleCollapse = () => {
    setMenuOpen((prevState) => !prevState);
  };

  return (
    <div
      className="menu-wrapper"
      onMouseEnter={() => setMenuOpen(true)}
      onMouseLeave={() => setMenuOpen(false)}
    >
      <nav className={`menu ${menuOpen ? "" : "collapsed"}`}>
        <div className="collapse-btn" onClick={handleCollapse}>
          {menuOpen ? <FaChevronLeft /> : <FaChevronRight />}
        </div>
        <ul>
          <li>
            <Link to="/create-post" className="nav-link">
              <FaPlus />
              <span>Create Post</span>
            </Link>
          </li>
          <li>
            <Link to="/favorites" className="nav-link">
              <FaHeart />
              <span>Favorites</span>
            </Link>
          </li>
          <li>
            <Link to="/notes" className="nav-link">
              <FaStickyNote />
              <span>Notes</span>
            </Link>
          </li>
          <li>
            <Link to="/trash" className="nav-link">
              <FaTrash />
              <span>Trash</span>
            </Link>
          </li>
          <li>
            <Link to="/profile" className="nav-link">
              <FaUser />
              <span>Profile</span>
            </Link>
          </li>
          <li>
            <Link to="/" className="nav-link">
              <FaHome />
              <span>Home</span>
            </Link>
          </li>
          <li>
            <Link to="/logout" className="nav-link">
              <FaSignOutAlt />
              <span>Logout</span>
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default Menu;
