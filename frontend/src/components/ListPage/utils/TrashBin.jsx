import React, { useState } from "react";
import { useDrop } from "react-dnd";
import { FaTrash, FaTrashRestore } from "react-icons/fa";
import ConfirmModal from "./ConfirmModal";

function TrashBin({ isDraggingDocument, handleDelete }) {
  const [showModal, setShowModal] = useState(false);
  const [currentDocument, setCurrentDocument] = useState(document);

  const handleConfirmDelete = () => {
    handleDelete(currentDocument);
    setShowModal(false);
  };

  const [{ isOver, canDrop }, drop] = useDrop(() => ({
    accept: "document",
    drop: (item, monitor) => {
      setCurrentDocument(item);
      setShowModal(true);
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  }));

  if (showModal)
    return (
      <ConfirmModal
        showModal={showModal}
        setShowModal={setShowModal}
        handleConfirmDelete={handleConfirmDelete}
      />
    );

  if (!isDraggingDocument) return null;

  return (
    <div
      ref={drop}
      style={{
        backgroundColor: isOver ? "white" : "white",
        minHeight: "100px",
        minWidth: "100px",
        position: "fixed",
        bottom: "20px",
        right: "20px",
        zIndex: 1000,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: "30px",
      }}
    >
      {isOver ? <FaTrashRestore size={58} /> : <FaTrash size={48} />}
    </div>
  );
}
export default TrashBin;
