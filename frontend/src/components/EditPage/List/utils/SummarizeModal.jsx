import '../../../../styles/EditPage/summarizeModal.scss'
import { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { generateTags } from "../../../../utils/noteHelper";
import { updateDoc } from "../../../../api/documents/updateDocument";

const confirmMessage =
  "Are you sure you want to generate a summary for this document?";
const processingMessage =
  "We'll process your request shortly. This may take 3-5 minutes.";

const SummarizeModal = ({ setShowModal, showModal, notes }) => {
  const [processingMessageVisible, setProcessingMessageVisible] =
    useState(false);

  const { document_id } = useParams();

  const handleModalConfirm = async () => {
    setShowModal(false);
    setProcessingMessageVisible(true);
    await handleTags(notes);
  };

  const handleTags = async (notes) => {
    const tags = await generateTags(notes);
    await updateDoc({ document_id, tags });
  };

  const handleProcessingMessageClose = () => {
    setProcessingMessageVisible(false);
  };

  return (
    <>
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Generate Summary</Modal.Title>
        </Modal.Header>
        <Modal.Body>{confirmMessage}</Modal.Body>
        <Modal.Footer>
          <Button variant="outline-secondary" onClick={() => setShowModal(false)}>
            Cancel
          </Button>
          <Button variant="secondary" onClick={handleModalConfirm}>
            Confirm
          </Button>
        </Modal.Footer>
      </Modal>
      <Modal
        show={processingMessageVisible}
        onHide={handleProcessingMessageClose}
      >
        <Modal.Header closeButton>
          <Modal.Title>Processing</Modal.Title>
        </Modal.Header>
        <Modal.Body>{processingMessage}</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleProcessingMessageClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default SummarizeModal;
