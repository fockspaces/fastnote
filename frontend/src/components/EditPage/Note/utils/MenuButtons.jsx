import { CgMenuBoxed } from "react-icons/cg";
import { FiArrowLeft } from "react-icons/fi";
import { IoBarcodeOutline } from "react-icons/io5";
import { AiOutlineTags } from "react-icons/ai";
import { FiTrash } from "react-icons/fi";

import { Link } from "react-router-dom";
import { Button, OverlayTrigger, Tooltip } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import SummarizeModal from "../../List/utils/SummarizeModal";
import { deleteDocument } from "../../../../api/documents/deleteDocument";
import { updateDoc } from "../../../../api/documents/updateDocument";
import ConfirmModal from "../../../ListPage/utils/ConfirmModal";

const Return = () => {
  const navigate = useNavigate();

  return (
    <Link to={`/documents`}>
      <OverlayTrigger
        placement="right"
        overlay={<Tooltip id="back-to-list-tooltip">Back to List</Tooltip>}
      >
        <Button
          variant=""
          size="sm"
          onClick={() => {
            navigate("/documents");
          }}
        >
          <FiArrowLeft size={40} />
        </Button>
      </OverlayTrigger>
    </Link>
  );
};

const Summarize = () => {
  const [showModal, setShowModal] = useState(false);

  return (
    <div>
      <OverlayTrigger
        placement="right"
        overlay={<Tooltip id="menu-tooltip">{`Summarize`}</Tooltip>}
      >
        <Link>
          <Button
            variant=""
            size="sm"
            onClick={() => {
              setShowModal(true);
            }}
          >
            <IoBarcodeOutline size={40} />
          </Button>
        </Link>
      </OverlayTrigger>

      <SummarizeModal showModal={showModal} setShowModal={setShowModal} />
    </div>
  );
};

const Menu = ({ setShowModal }) => {
  const isMac = /(Mac|iPhone|iPod|iPad)/i.test(navigator.platform);
  const commandKey = isMac ? "⌘" : "Ctrl";
  return (
    <OverlayTrigger
      placement="right"
      overlay={
        <Tooltip id="menu-tooltip">{`Open Menu (${commandKey} + m)`}</Tooltip>
      }
    >
      <Button
        className="menu-button"
        variant=""
        size="md"
        onClick={() => {
          setShowModal(true);
        }}
      >
        <CgMenuBoxed size={40} />
      </Button>
    </OverlayTrigger>
  );
};

const Info = ({ setShowInfoModal }) => {
  return (
    <OverlayTrigger
      placement="right"
      overlay={<Tooltip id="menu-tooltip">{"Tag"}</Tooltip>}
    >
      <Button
        className="menu-button"
        variant=""
        size="md"
        onClick={() => {
          setShowInfoModal(true);
        }}
      >
        <AiOutlineTags size={40} />
      </Button>
    </OverlayTrigger>
  );
};

const Trash = ({ document }) => {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);

  const body = document.is_trash
    ? "delete this note?"
    : "move the note to trash bin?";
  const message = {
    title: "Confirm Remove",
    body: "Are you sure you want to " + body,
    confirm: "Remove",
  };

  const handleDelete = async () => {
    if (document.is_trash) await deleteDocument(document._id);
    else await updateDoc({ is_trash: true, document_id: document._id });
    navigate(-1);
  };
  return (
    <OverlayTrigger
      placement="right"
      overlay={<Tooltip id="menu-tooltip">{"Remove"}</Tooltip>}
    >
      <div>
        <Button
          className="menu-button"
          variant=""
          size="md"
          onClick={() => setShowModal(true)}
        >
          <FiTrash size={40} />
        </Button>
        <ConfirmModal
          showModal={showModal}
          setShowModal={setShowModal}
          handleConfirmDelete={handleDelete}
          message={message}
        />
      </div>
    </OverlayTrigger>
  );
};

const MenuButtons = ({ setShowModal, setShowInfoModal, document }) => {
  return (
    <div className="floating-buttons">
      <Return />
      <Menu setShowModal={setShowModal} />
      <Info setShowInfoModal={setShowInfoModal} />
      <Summarize />
      <Trash document={document} />
    </div>
  );
};

export default MenuButtons;
