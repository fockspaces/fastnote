import React, { useState } from "react";
import { Row } from "react-bootstrap";
import DocumentListItem from "./DocumentItem";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import DarkBackground from "../utils/DarkBackground";
import TrashBin from "../utils/TrashBin";
import RestoreTrash from "../utils/RestoreTrash";

function DocumentList({
  documents,
  handleDelete,
  tagging,
  setTagging,
  is_trash,
}) {
  const [isDraggingDocument, setIsDraggingDocument] = useState(false);

  return (
    <DndProvider backend={HTML5Backend}>
      <Row sm={1} md={2} lg={3} className="justify-content-left">
        {documents.map((doc) => (
          <DocumentListItem
            key={doc._id}
            document={doc}
            tagging={tagging}
            setTagging={setTagging}
            setIsDraggingDocument={setIsDraggingDocument}
          />
        ))}
      </Row>
      <RestoreTrash
        is_trash={is_trash}
        isDraggingDocument={isDraggingDocument}
        handleDelete={handleDelete}
      />
      <TrashBin
        handleDelete={handleDelete}
        isDraggingDocument={isDraggingDocument}
        is_trash={is_trash}
      />
      <DarkBackground
        isDraggingDocument={isDraggingDocument}
        handleDelete={handleDelete}
        is_trash={is_trash}
      />
    </DndProvider>
  );
}

export default DocumentList;
