import { useState } from "react";
import { Button, OverlayTrigger, Tooltip } from "react-bootstrap";
import { Link } from "react-router-dom";
import { IoCreate } from "react-icons/io5";
import ConfirmModal from "../../ListPage/utils/ConfirmModal";

export const CreateNote = ({ createNote }) => {
  const [isCreatingNote, setIsCreatingNote] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const message = {
    title: "Confirm New Chapter",
    body: "Are you sure you want to create a new chapter?",
    confirm: "Create",
  };

  const handleCreateNote = async () => {
    setIsCreatingNote(true);
    await createNote();
    setIsCreatingNote(false);
    setShowModal(false);
  };

  return (
    <div>
      <Link>
        <OverlayTrigger
          placement="top"
          overlay={<Tooltip id="new-chapter-tooltip">New Chapter</Tooltip>}
        >
          <Button
            disabled={isCreatingNote}
            variant=""
            size="sm"
            onClick={() => setShowModal(true)}
          >
            <IoCreate size={25} />
          </Button>
        </OverlayTrigger>
      </Link>
      <ConfirmModal
        message={message}
        handleConfirmDelete={handleCreateNote}
        showModal={showModal}
        setShowModal={setShowModal}
      />
    </div>
  );
};
