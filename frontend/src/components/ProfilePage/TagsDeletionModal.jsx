import "../../styles/ListPage/confirmModal.scss";
import { useState } from "react";
import { Button, Modal, Form } from "react-bootstrap";
import TagsBar from "../ListPage/utils/TagsBar";

const TagsDeletionModal = ({ showModal, setShowModal, handleUpdate, tags }) => {
  const [selectedTags, setSelectedTags] = useState([]);
  const [isValid, setIsValid] = useState(true);

  const handleConfirm = () => {
    handleUpdate(selectedTags);
    setShowModal(false);
  };
  return (
    <Modal
      show={showModal}
      onHide={() => setShowModal(false)}
      className="confirm-modal"
    >
      <Modal.Header closeButton>
        <Modal.Title>Remove Tags</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form.Group>
          <Form.Label>Select Tags to remove</Form.Label>
          <TagsBar
            tagging={selectedTags}
            setTagging={setSelectedTags}
            whitelist={tags}
          />
        </Form.Group>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={() => setShowModal(false)}>
          Cancel
        </Button>
        <Button variant="dark" onClick={handleConfirm} disabled={!isValid}>
          Remove
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default TagsDeletionModal;
