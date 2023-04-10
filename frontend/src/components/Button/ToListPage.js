import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";

const ToListPage = () => {
  return (
    <Link to={`/document`}>
      <Button variant="outline-primary" size="sm">
        Back
      </Button>
    </Link>
  );
};

export default ToListPage;
