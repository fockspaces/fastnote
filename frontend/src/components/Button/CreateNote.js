import { Button } from "react-bootstrap";

export const CreateNote = ({ createNote }) => {
  return (
    <Button variant="outline-success" size="sm" onClick={createNote}>
      Create
    </Button>
  );
};
