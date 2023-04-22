import React, { useState } from "react";
import { Row } from "react-bootstrap";
import DocumentListItem from "./DocumentItem";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import DarkBackground from "../utils/DarkBackground";
import DragLayer from "../utils/DragLayer";
import TrashBin from "../utils/TrashBin";

function DocumentList({ documents, handleDelete, tagging, setTagging }) {
  const [isDraggingDocument, setIsDraggingDocument] = useState(false);

  return (
    <DndProvider backend={HTML5Backend}>
      <Row sm={1} md={1} lg={2} className="justify-content-left">
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
      <TrashBin
        handleDelete={handleDelete}
        isDraggingDocument={isDraggingDocument}
      />
      <DarkBackground
        isDraggingDocument={isDraggingDocument}
        handleDelete={handleDelete}
      />
      <DragLayer />
    </DndProvider>
  );
}

export default DocumentList;
