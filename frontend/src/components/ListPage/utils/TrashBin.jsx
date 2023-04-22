import React, { useState } from "react";
import { useDrop } from "react-dnd";
import { FaTrash } from "react-icons/fa";
import ConfirmModal from "./ConfirmModal";

function TrashBin({ handleDelete }) {
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

  return (
    <div
      ref={drop}
      style={{
        backgroundColor: isOver ? "red" : "transparent",
        minHeight: "100px",
        minWidth: "100px",
        position: "fixed",
        bottom: "20px",
        right: "20px",
        zIndex: 1000,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <FaTrash size={48} />
      <ConfirmModal
        showModal={showModal}
        setShowModal={setShowModal}
        handleConfirmDelete={handleConfirmDelete}
      />
    </div>
  );
}
export default TrashBin;
