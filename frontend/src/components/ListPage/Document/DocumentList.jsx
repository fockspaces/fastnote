import React from "react";
import { Row } from "react-bootstrap";
import DocumentListItem from "./DocumentItem";
import TrashBin from "../utils/TrashBin";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

function DocumentList({ documents, handleDelete, tagging, setTagging }) {
  return (
    <DndProvider backend={HTML5Backend}>
      <Row sm={1} md={1} lg={2} className="justify-content-left">
        {documents.map((doc) => (
          <DocumentListItem
            key={doc._id}
            document={doc}
            tagging={tagging}
            setTagging={setTagging}
          />
        ))}
      </Row>
      <TrashBin handleDelete={handleDelete} />
    </DndProvider>
  );
}

export default DocumentList;
