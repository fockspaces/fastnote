import "../../styles/menu.scss";
import React from "react";
import { Link, useNavigate } from "react-router-dom";
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
import { createDocument } from "../../api/documents/createDocument";

function Menu({ menuOpen, setMenuOpen }) {
  const navigate = useNavigate();

  const handleCollapse = (toggle) => {
    if (toggle) return setMenuOpen((prevState) => !prevState);
    setMenuOpen(false);
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("access_token");
    window.location.href = "/";
  };

  const handleCreateNote = async () => {
    const result = await createDocument();
    console.log(result.document);
    handleCollapse();
    navigate(`/document/${result.document._id}`); // Use history.push to navigate to the new page
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
          <li onClick={handleCreateNote}>
            <Link to="/documents" className="nav-link">
              <IoCreate />
              <span>New</span>
            </Link>
          </li>
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
