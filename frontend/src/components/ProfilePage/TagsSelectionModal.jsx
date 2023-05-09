import "../../styles/ListPage/confirmModal.scss";
import { useState } from "react";
import { Button, Modal, Form } from "react-bootstrap";
import TagsBar from "../ListPage/utils/TagsBar";

const TagsSelectionModal = ({
  showModal,
  setShowModal,
  handleUpdate,
  tags,
}) => {
  const [newTagName, setNewTagName] = useState("");
  const [selectedTags, setSelectedTags] = useState([]);
  const [isValid, setIsValid] = useState(true);

  const handleChange = (event) => {
    const value = event.target.value;
    console.log(value);
    setNewTagName(value);
    setIsValid(value.length >= 2 && value.length <= 20);
  };

  const handleConfirm = () => {
    handleUpdate(newTagName, selectedTags);
    setShowModal(false);
  };
  return (
    <Modal
      show={showModal}
      onHide={() => setShowModal(false)}
      className="confirm-modal"
    >
      <Modal.Header closeButton>
        <Modal.Title>Merge Tags</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form.Group>
          <Form.Label>New Tag Name</Form.Label>
          <Form.Control
            type="text"
            value={newTagName}
            onChange={handleChange}
            placeholder="Enter a new tag name..."
            isInvalid={!isValid}
          />
          <Form.Control.Feedback type="invalid">
            The new tag name must be between 2 and 20 characters long.
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group>
          <Form.Label>Select Tags to Merge</Form.Label>
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
          Merge
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default TagsSelectionModal;
