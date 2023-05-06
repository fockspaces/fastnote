import "../../../../styles/EditPage/summarizeModal.scss";
import { useEffect, useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { summarizeDocument } from "../../../../api/documents/summarizeDocument.js";

const confirmMessage =
  "Are you sure you want to generate a summary for this document?";

const SummarizeModal = ({ setShowModal, showModal }) => {
  const [processingMessageVisible, setProcessingMessageVisible] =
    useState(false);

  const [processingMessage, setProcessingMessage] = useState({
    title: "Sumarization Service",
    body: "We'll process your request shortly. This may take 3-5 minutes.",
  });

  const { document_id } = useParams();

  const handleModalConfirm = async () => {
    setShowModal(false);
    const result = await summarizeDocument(document_id);
    if (!result)
      setProcessingMessage({
        title: "Failed",
        body: "content length should be over 100 characters",
      });
    setProcessingMessageVisible(true);
  };

  const handleProcessingMessageClose = () => {
    setProcessingMessageVisible(false);
  };

  const handleKeyDown = (event) => {
    // console.log({ processingMessageVisible, event });
    if (event.key === "Enter") {
      if (!processingMessageVisible) return handleModalConfirm(event);
      handleProcessingMessageClose();
    }
  };

  useEffect(() => {
    if (showModal || processingMessageVisible) {
      window.addEventListener("keydown", handleKeyDown);
    } else {
      window.removeEventListener("keydown", handleKeyDown);
    }
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [showModal, processingMessageVisible]);

  return (
    <>
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Generate Summary</Modal.Title>
        </Modal.Header>
        <Modal.Body>{confirmMessage}</Modal.Body>
        <Modal.Footer>
          <Button
            variant="outline-secondary"
            onClick={() => setShowModal(false)}
          >
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
          <Modal.Title>{processingMessage.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>{processingMessage.body}</Modal.Body>
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
