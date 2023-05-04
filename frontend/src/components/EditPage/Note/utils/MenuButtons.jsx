import { CgMenuBoxed } from "react-icons/cg";
import { FiArrowLeft } from "react-icons/fi";
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const ToListPage = () => {
  const navigate = useNavigate();

  return (
    <Link to={`/documents`}>
      <Button
        variant=""
        size="sm"
        onClick={() => {
          navigate(-1);
        }}
      >
        <FiArrowLeft size={40} />
      </Button>
    </Link>
  );
};

const MenuButtons = ({ setShowModal }) => {
  return (
    <div className="floating-buttons">
      <ToListPage />
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
    </div>
  );
};

export default MenuButtons;
