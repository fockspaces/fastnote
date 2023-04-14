import React from "react";
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
import "../../styles/menu.scss";

function Menu({ menuOpen, setMenuOpen }) {
  const handleCollapse = (toggle) => {
    if (toggle) return setMenuOpen((prevState) => !prevState);
    setMenuOpen(false);
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("access_token");
    window.location.href = "/";
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
          <li
            onClick={() => {
              handleCollapse();
            }}
          >
            <Link to="/documents" className="nav-link">
              <FaListUl />
              <span>Notes</span>
            </Link>
          </li>
          <li
            onClick={() => {
              handleCollapse();
            }}
          >
            <Link to="/favorites" className="nav-link">
              <FaHeart />
              <span>Favorites</span>
            </Link>
          </li>
          <li
            onClick={() => {
              handleCollapse();
            }}
          >
            <Link to="/trash" className="nav-link">
              <FaTrash />
              <span>Trash</span>
            </Link>
          </li>
          <li
            onClick={() => {
              handleCollapse();
            }}
          >
            <Link to="/profile" className="nav-link">
              <FaUser />
              <span>Profile</span>
            </Link>
          </li>
          <li
            onClick={() => {
              handleCollapse();
            }}
          >
            <Link to="/" className="nav-link">
              <FaHome />
              <span>Home</span>
            </Link>
          </li>
          <li onClick={handleLogout}>
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
