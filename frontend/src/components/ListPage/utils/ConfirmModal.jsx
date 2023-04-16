import "../../../styles/ListPage/confirmModal.scss";
import { Button, Modal } from "react-bootstrap";

const ConfirmModal = ({ showModal, setShowModal, handleConfirmDelete }) => {
  return (
    <Modal
      show={showModal}
      onHide={() => setShowModal(false)}
      className="confirm-modal"
    >
      <Modal.Header closeButton>
        <Modal.Title>Confirm Delete</Modal.Title>
      </Modal.Header>
      <Modal.Body>Are you sure you want to delete this document?</Modal.Body>
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
          Delete
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ConfirmModal;
