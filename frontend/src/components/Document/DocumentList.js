import React from "react";
import { Row } from "react-bootstrap";
import DocumentListItem from "./DocumentItem";

function DocumentList({ documents, handleDelete }) {
  return (
    <Row xs={1} sm={2} md={3} className="g-4">
      {documents.map((doc) => (
        <DocumentListItem
          key={doc._id}
          document={doc}
          handleDelete={handleDelete}
        />
      ))}
    </Row>
  );
}

export default DocumentList;
