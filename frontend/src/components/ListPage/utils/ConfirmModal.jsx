import "../../../styles/ListPage/confirmModal.scss";
import { Button, Modal } from "react-bootstrap";

const ConfirmModal = ({
  showModal,
  setShowModal,
  handleConfirmDelete,
  message,
}) => {
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
          Cancel
        </Button>
        <Button
          variant="danger"
          onClick={(e) => {
            handleConfirmDelete(e);
          }}
        >
          {message.confirm}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ConfirmModal;
