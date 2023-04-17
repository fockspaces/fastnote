import React from "react";
import { Row } from "react-bootstrap";
import DocumentListItem from "./DocumentItem";

function DocumentList({ documents, handleDelete, tagging,setTagging }) {
  return (
    <Row sm={1} md={1} lg={2} className="justify-content-left">
      {documents.map((doc) => (
        <DocumentListItem
          key={doc._id}
          document={doc}
          handleDelete={handleDelete}
          tagging={tagging}
          setTagging={setTagging}
        />
      ))}
    </Row>
  );
}

export default DocumentList;
