import "../../styles/menu.scss";
import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";

import {
  FaTrash,
  FaUser,
  FaHome,
  FaSignOutAlt,
  FaChevronLeft,
  FaChevronRight,
  FaListUl,
} from "react-icons/fa";
import { RiBookMarkFill } from "react-icons/ri";
import { IoCreate } from "react-icons/io5";
import CreateConfirmModal from "./utils/CreateConfirmModal";
import { useLocation } from "react-router-dom";
import ConfirmModal from "../ListPage/utils/ConfirmModal";

const user = localStorage.getItem("user");

function Menu({ menuOpen, setMenuOpen }) {
  const menuRef = useRef();
  const location = useLocation();

  const getIconColor = (path) => {
    if (user) return location.pathname === path ? "wheat" : "inherit";
  };

  const [showModal, setShowModal] = useState(false);
  const [showLogoutModal, setLogoutModal] = useState(false);

  const handleCollapse = (toggle) => {
    if (toggle) return setMenuOpen((prevState) => !prevState);
    setMenuOpen(false);
  };

  const logoutMessage = {
    title: "Confirm Logout",
    body: "We appreciate your visit and hope to see you back soon.",
    confirm: "Logout",
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

  // close the menu when not focus on
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        handleCollapse(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [menuOpen, menuRef]);

  return (
    <div className="menu-wrapper">
      <nav ref={menuRef} className={`menu ${menuOpen ? "" : "collapsed"}`}>
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
            <Link className={`nav-link ${!user ? "disabled" : ""}`}>
              <IoCreate />
              <span>New</span>
            </Link>
          </li>
          <li
            onClick={() => {
              handleCollapse();
            }}
          >
            <Link
              to="/documents"
              className={`nav-link ${!user ? "disabled" : ""}`}
            >
              <FaListUl color={getIconColor("/documents")} />
              <span>Notes</span>
            </Link>
          </li>
          <li
            onClick={() => {
              handleCollapse();
            }}
          >
            <Link
              to="/favorites"
              className={`nav-link ${!user ? "disabled" : ""}`}
            >
              <RiBookMarkFill color={getIconColor("/favorites")} />
              <span>Bookmarks</span>
            </Link>
          </li>
          <li
            onClick={() => {
              handleCollapse();
            }}
          >
            <Link to="/trash" className={`nav-link ${!user ? "disabled" : ""}`}>
              <FaTrash color={getIconColor("/trash")} />
              <span>Trash</span>
            </Link>
          </li>
          <li
            onClick={() => {
              handleCollapse();
            }}
          >
            <Link
              to="/profile"
              className={`nav-link ${!user ? "disabled" : ""}`}
            >
              <FaUser color={getIconColor("/profile")} />
              <span>Profile</span>
            </Link>
          </li>
          <li
            onClick={() => {
              handleCollapse();
            }}
          >
            <Link to="/" className={`nav-link ${!user ? "disabled" : ""}`}>
              <FaHome color={getIconColor("/")} />
              <span>Home</span>
            </Link>
          </li>
          <li onClick={() => setLogoutModal(true)}>
            <Link className={`nav-link ${!user ? "disabled" : ""}`}>
              <FaSignOutAlt />
              <span>Logout</span>
            </Link>
          </li>
        </ul>
      </nav>
      <CreateConfirmModal showModal={showModal} setShowModal={setShowModal} />
      <ConfirmModal
        showModal={showLogoutModal}
        setShowModal={setLogoutModal}
        handleConfirmDelete={handleLogout}
        message={logoutMessage}
      />
    </div>
  );
}

export default Menu;
