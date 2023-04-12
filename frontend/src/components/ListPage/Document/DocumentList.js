import React from "react";
import { Row } from "react-bootstrap";
import DocumentListItem from "./DocumentItem";

function DocumentList({ documents, handleDelete, handleToTrash }) {
  return (
    <Row xs={1} sm={2} md={2} lg={3} className="g-4 justify-content-md-between">
      {documents.map((doc) => (
        <DocumentListItem
          key={doc._id}
          document={doc}
          handleDelete={handleDelete}
          handleToTrash={handleToTrash}
        />
      ))}
    </Row>
  );
}

export default DocumentList;
