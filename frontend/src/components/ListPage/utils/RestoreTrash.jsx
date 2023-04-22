import React, { useState } from "react";
import { useDrop } from "react-dnd";
import { FaTrash, FaTrashRestore } from "react-icons/fa";
import { MdOutlineRestorePage, MdRestorePage } from "react-icons/md";
import ConfirmModal from "./ConfirmModal";

function RestoreTrash({ isDraggingDocument, handleDelete, is_trash }) {
  const [showModal, setShowModal] = useState(false);
  const [currentDocument, setCurrentDocument] = useState(document);

  const handleConfirmRestore = () => {
    handleDelete(currentDocument, true);
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

  if (!is_trash) return null;

  if (showModal)
    return (
      <ConfirmModal
        showModal={showModal}
        setShowModal={setShowModal}
        handleConfirmDelete={handleConfirmRestore}
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
        left: "100px",
        zIndex: 1000,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: "30px",
      }}
    >
      {isOver ? <MdOutlineRestorePage size={58} /> : <MdRestorePage size={48} />}
    </div>
  );
}
export default RestoreTrash;
