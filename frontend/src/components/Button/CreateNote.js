import { Button } from "react-bootstrap";
import { FiPlus } from "react-icons/fi";
import { Link } from "react-router-dom";

export const CreateNote = ({ createNote }) => {
  return (
    <Link>
      <Button variant="" size="sm" onClick={createNote}>
        <FiPlus /> Create
      </Button>
    </Link>
  );
};
