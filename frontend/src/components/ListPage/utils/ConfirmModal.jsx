import { useEffect } from "react";
import "../../../styles/ListPage/confirmModal.scss";
import { Button, Modal } from "react-bootstrap";

const ConfirmModal = ({
  showModal,
  setShowModal,
  handleConfirmDelete,
  message,
}) => {
  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      handleConfirmDelete(event);
    }
  };

  useEffect(() => {
    if (showModal) {
      window.addEventListener("keydown", handleKeyDown);
    } else {
      window.removeEventListener("keydown", handleKeyDown);
    }
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [showModal]);

  if (!message) return null;
  return (
    <Modal
      show={showModal}
      onHide={() => setShowModal(false)}
      className="confirm-modal"
    >
      <Modal.Header closeButton>
        <Modal.Title>{message.title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>{message.body}</Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={() => setShowModal(false)}>
          {`Cancel`}
        </Button>
        <Button
          variant="danger"
          onClick={(e) => {
            handleConfirmDelete(e);
          }}
        >
          {`${message.confirm}`}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ConfirmModal;
