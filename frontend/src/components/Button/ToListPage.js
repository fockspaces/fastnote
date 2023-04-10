import { FiArrowLeft } from "react-icons/fi";
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";

const ToListPage = () => {
  return (
    <Link to={`/document`}>
      <Button variant="" size="sm">
        <FiArrowLeft /> Back
      </Button>
    </Link>
  );
};

export default ToListPage;
