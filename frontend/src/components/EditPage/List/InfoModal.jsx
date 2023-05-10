import "../../../styles/EditPage/InfoModal.scss";
import React, { useEffect, useState } from "react";
import { Modal, Button } from "react-bootstrap";
import TagsBar from "../../ListPage/utils/TagsBar";
import { updateDoc } from "../../../api/documents/updateDocument";

const InfoModal = ({ document, showModal, toggleModal }) => {
  const [tagging, setTagging] = useState(document.tags);

  const handleTagsUpdate = async () => {
    await updateDoc(
      { tags: tagging, document_id: document._id },
      "update_tags"
    );
  };

  useEffect(() => {
    // update Document
    handleTagsUpdate();
  }, [tagging]);

  return (
    <Modal show={showModal} onHide={toggleModal}>
      <Modal.Header closeButton>
        <Modal.Title>Document Info</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div>
          <p className="edit-tags">Edit Tags:</p>
          <TagsBar tagging={tagging} setTagging={setTagging} />
        </div>
        <div className="date-info">
          <p>Created At: {new Date(document.createdAt).toLocaleString()}</p>
          <p>Updated At: {new Date(document.updatedAt).toLocaleString()}</p>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={toggleModal}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default InfoModal;
