import "../../styles/menu.scss";
import React, { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { OverlayTrigger, Tooltip } from "react-bootstrap"; // Import OverlayTrigger and Tooltip

import { FaTrash, FaUser, FaHome, FaSignOutAlt, FaBook } from "react-icons/fa";
import { BsFillBookmarksFill, BsJournalBookmarkFill } from "react-icons/bs";
import { MdCreateNewFolder } from "react-icons/md";
import CreateConfirmModal from "./utils/CreateConfirmModal";
import { useLocation } from "react-router-dom";
import ConfirmModal from "../ListPage/utils/ConfirmModal";
import { createDocument } from "../../api/documents/createDocument";
import { updateDoc } from "../../api/documents/updateDocument";

const user = localStorage.getItem("user");

function Menu({ menuOpen, setMenuOpen }) {
  const menuRef = useRef();
  const location = useLocation();
  const navigate = useNavigate();

  const getIconColor = (path) => {
    if (user) return location.pathname === path ? "wheat" : "inherit";
  };

  // const [showModal, setShowModal] = useState(false);
  const [showLogoutModal, setLogoutModal] = useState(false);

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

  const handleCreate = async (e) => {
    e.preventDefault();
    const result = await createDocument({});

    await createNote(result.document._id);
    navigate(`/document/${result.document._id}`);
  };

  // create new note
  const createNote = async (document_id) => {
    const note = { document_id, title: "new note", content: "" };
    await updateDoc(note, "insert_paragraph");
  };

  // close the menu when not focus on
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
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
        <ul>
          <li onClick={user ? handleCreate : null}>
            <OverlayTrigger
              placement="right"
              overlay={<Tooltip id="new-tooltip">New Note</Tooltip>}
            >
              <Link className={`nav-link ${!user ? "disabled" : ""}`}>
                <MdCreateNewFolder />
              </Link>
            </OverlayTrigger>
          </li>
          <li>
            <OverlayTrigger
              placement="right"
              overlay={<Tooltip id="new-tooltip">Notes</Tooltip>}
            >
              <Link
                to="/documents"
                className={`nav-link ${!user ? "disabled" : ""}`}
              >
                <FaBook color={getIconColor("/documents")} />
              </Link>
            </OverlayTrigger>
          </li>
          <li>
            <OverlayTrigger
              placement="right"
              overlay={<Tooltip id="new-tooltip">Bookmarks</Tooltip>}
            >
              <Link
                to="/favorites"
                className={`nav-link ${!user ? "disabled" : ""}`}
              >
                <BsFillBookmarksFill color={getIconColor("/favorites")} />
              </Link>
            </OverlayTrigger>
          </li>
          <li>
            <OverlayTrigger
              placement="right"
              overlay={<Tooltip id="new-tooltip">Trash</Tooltip>}
            >
              <Link
                to="/trash"
                className={`nav-link ${!user ? "disabled" : ""}`}
              >
                <FaTrash color={getIconColor("/trash")} />
              </Link>
            </OverlayTrigger>
          </li>
          <li>
            <OverlayTrigger
              placement="right"
              overlay={<Tooltip id="new-tooltip">Profile</Tooltip>}
            >
              <Link
                to="/profile"
                className={`nav-link ${!user ? "disabled" : ""}`}
              >
                <FaUser color={getIconColor("/profile")} />
              </Link>
            </OverlayTrigger>
          </li>
          <li>
            <OverlayTrigger
              placement="right"
              overlay={<Tooltip id="new-tooltip">Home</Tooltip>}
            >
              <Link to="/" className={`nav-link ${!user ? "disabled" : ""}`}>
                <FaHome color={getIconColor("/")} />
              </Link>
            </OverlayTrigger>
          </li>
          <li
            onClick={() => {
              if (user) setLogoutModal(true);
            }}
          >
            <OverlayTrigger
              placement="right"
              overlay={<Tooltip id="new-tooltip">Logout</Tooltip>}
            >
              <Link className={`nav-link ${!user ? "disabled" : ""}`}>
                <FaSignOutAlt />
              </Link>
            </OverlayTrigger>
          </li>
        </ul>
      </nav>
      {/* <CreateConfirmModal showModal={showModal} setShowModal={setShowModal} /> */}
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
