import { FaTrash } from "react-icons/fa";
import TrashBin from "./TrashBin";

const DarkBackground = ({ isDraggingDocument, handleDelete }) => {
  if (!isDraggingDocument) {
    return null;
  }

  return (
    <>
      <div
        style={{
          backgroundColor: "rgba(0, 0, 0, 0.5)",
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          zIndex: 999,
        }}
      />
      <div
        style={{
          position: "fixed",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          zIndex: 1001,
          color: "white",
          fontSize: "1.5rem",
          textAlign: "center",
        }}
      >
        Drag the document to the trash bin <FaTrash />
      </div>
    </>
  );
};

export default DarkBackground;
