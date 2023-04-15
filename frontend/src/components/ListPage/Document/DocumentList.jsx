import React from "react";
import { Row } from "react-bootstrap";
import DocumentListItem from "./DocumentItem";

function DocumentList({ documents, handleDelete }) {
  return (
    <Row sm={2} md={2} lg={3} className="justify-content-left">
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
