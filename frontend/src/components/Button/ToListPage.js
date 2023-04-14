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
        <FiArrowLeft /> Back
      </Button>
    </Link>
  );
};

export default ToListPage;
