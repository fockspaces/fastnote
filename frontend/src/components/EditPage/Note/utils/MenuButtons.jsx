import { CgMenuBoxed } from "react-icons/cg";
import { FiArrowLeft } from "react-icons/fi";
import { IoBarcodeOutline } from "react-icons/io5";
import { FiInfo } from "react-icons/fi";
import { FaTrash } from "react-icons/fa";

import { Link } from "react-router-dom";
import { Button, OverlayTrigger, Tooltip } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import SummarizeModal from "../../List/utils/SummarizeModal";
import { deleteDocument } from "../../../../api/documents/deleteDocument";

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
      overlay={<Tooltip id="menu-tooltip">{"Info"}</Tooltip>}
    >
      <Button
        className="menu-button"
        variant=""
        size="md"
        onClick={() => {
          setShowInfoModal(true);
        }}
      >
        <FiInfo size={40} />
      </Button>
    </OverlayTrigger>
  );
};

// TODO: add functions here
const Trash = ({ document_id }) => {
  const handleDelete = async () => {
    await deleteDocument(document_id);
  };
  return (
    <OverlayTrigger
      placement="right"
      overlay={<Tooltip id="menu-tooltip">{"Remove"}</Tooltip>}
    >
      <Button
        className="menu-button"
        variant=""
        size="md"
        onClick={handleDelete}
      >
        <FaTrash size={40} />
      </Button>
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
      <Trash document_id={document._id} />
    </div>
  );
};

export default MenuButtons;
