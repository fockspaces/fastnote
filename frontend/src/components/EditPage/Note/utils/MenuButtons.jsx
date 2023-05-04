import { CgMenuBoxed } from "react-icons/cg";
import { FiArrowLeft } from "react-icons/fi";
import { Link } from "react-router-dom";
import { Button, OverlayTrigger, Tooltip } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const ToListPage = () => {
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
            navigate(-1);
          }}
        >
          <FiArrowLeft size={40} />
        </Button>
      </OverlayTrigger>
    </Link>
  );
};

const MenuButtons = ({ setShowModal }) => {
  const isMac = /(Mac|iPhone|iPod|iPad)/i.test(navigator.platform);
  const commandKey = isMac ? "⌘" : "Ctrl";
  return (
    <div className="floating-buttons">
      <ToListPage />
      <OverlayTrigger
        placement="right"
        overlay={<Tooltip id="menu-tooltip">{`Open Menu (${commandKey} + m)`}</Tooltip>}
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
    </div>
  );
};

export default MenuButtons;
