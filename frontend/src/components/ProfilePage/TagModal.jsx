import { useEffect, useState } from "react";
import "../../styles/ListPage/confirmModal.scss";
import { Button, Modal } from "react-bootstrap";

const TagModal = ({
  showModal,
  setShowModal,
  handleUpdate,
  message,
  handleDelete,
  oldTagName,
}) => {
  const [newTagName, setNewTagName] = useState(oldTagName);
  const [isValid, setIsValid] = useState(true);
  const handleKeyDown = (event) => {
    if (event.key === "Enter" && isValid) {
      handleUpdate(newTagName);
    }
  };
  useEffect(() => {
    setNewTagName("");
    setIsValid(true);
  }, [oldTagName]);
  useEffect(() => {
    if (showModal) {
      window.addEventListener("keydown", handleKeyDown);
    } else {
      window.removeEventListener("keydown", handleKeyDown);
    }
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [showModal, isValid, newTagName]);

  const handleChange = (event) => {
    const value = event.target.value;
    setNewTagName(value);
    setIsValid(value.length >= 2 && value.length <= 12);
  };

  return (
    <Modal
      show={showModal}
      onHide={() => setShowModal(false)}
      className="confirm-modal"
    >
      <Modal.Header closeButton>
        <Modal.Title>{`Edit  #${oldTagName}`}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <input
          type="text"
          value={newTagName}
          onChange={handleChange}
          placeholder="Enter a new tag name..."
        />
        {!isValid && (
          <p className="text-danger">
            The new tag name must be between 2 and 12 characters long.
          </p>
        )}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={() => setShowModal(false)}>
          Cancel
        </Button>
        <Button
          variant="danger"
          disabled={!isValid}
          onClick={() => handleUpdate(newTagName)}
        >
          Edit
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default TagModal;
