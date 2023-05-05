import "../../../styles/ListPage/CreateConfirmModal.scss";
import { Form, Button, Modal } from "react-bootstrap";
import { useState } from "react";
import { createDocument } from "../../../api/documents/createDocument";
import { updateDoc } from "../../../api/documents/updateDocument";
import { useNavigate } from "react-router-dom";

const CreateConfirmModal = ({ showModal, setShowModal }) => {
  const [inputTitle, setInputTitle] = useState("");
  const [inputDescription, setInputDescription] = useState("");
  const navigate = useNavigate();

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const result = await createDocument({
      title: inputTitle,
      description: inputDescription,
    });
    setShowModal(false);
    await createNote(result.document._id);
    navigate(`/document/${result.document._id}`);
  };

  // create new note
  const createNote = async (document_id) => {
    const note = { document_id, title: "new chapter", content: "" };
    await updateDoc(note, "insert_paragraph");
  };

  return (
    <Modal
      className="confirm-modal"
      show={showModal}
      onHide={() => setShowModal(false)}
    >
      <Modal.Header closeButton>
        <Modal.Title>Create New Note</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleFormSubmit}>
          <Form.Group className="mb-2" controlId="documentTitle">
            <Form.Label className="mb-2">Title</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter document title"
              value={inputTitle}
              onChange={(e) => setInputTitle(e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group controlId="documentDescription">
            <Form.Label className="mb-2">Description</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              placeholder="Enter document description"
              value={inputDescription}
              onChange={(e) => setInputDescription(e.target.value)}
            />
          </Form.Group>
          <Button variant="primary mt-3" type="submit">
            Create
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default CreateConfirmModal;
