import { useState } from "react";
import { Button } from "react-bootstrap";
import { FiPlus } from "react-icons/fi";
import { Link } from "react-router-dom";

export const CreateNote = ({ createNote }) => {
  const [isCreatingNote, setIsCreatingNote] = useState(false);

  const handleCreateNote = async () => {
    setIsCreatingNote(true);
    await createNote();
    setIsCreatingNote(false);
  };
  return (
    <Link>
      <Button
        disabled={isCreatingNote}
        variant=""
        size="sm"
        onClick={handleCreateNote}
      >
        <FiPlus /> Create
      </Button>
    </Link>
  );
};
