import React, { useState } from "react";
import { Col, Card, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { FaEdit, FaTrash } from "react-icons/fa";
import { updateDoc } from "../../api/documents/updateDocument";

function DocumentListItem({ document, handleDelete }) {
  const [title, setTitle] = useState(document.title);

  const handleTitleUpdate = async () => {
    await updateDoc({ title, document_id: document._id });
  };

  return (
    <Col>
      <Card className="h-full">
        <Card.Body className="h-full flex flex-col">
          <Card.Title className="text-lg font-bold mb-2">
            <input
              onChange={(e) => {
                setTitle(e.target.value);
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleTitleUpdate();
                  e.target.blur(); // remove focus
                }
              }}
              value={title}
            />
          </Card.Title>
          <div className="flex gap-2 list__header">
            <Link to={`/document/${document._id}`}>
              <Button variant size="sm">
                <FaEdit /> Edit
              </Button>
            </Link>
            <Link>
              <Button
                variant
                size="sm"
                onClick={() => {
                  handleDelete(document);
                }}
              >
                <FaTrash /> Delete
              </Button>
            </Link>
          </div>
          <div className="mt-2">
            {document.tags.map((tag, index) => (
              <span key={index} className="badge bg-secondary me-1">
                {tag}
              </span>
            ))}
          </div>
        </Card.Body>
      </Card>
    </Col>
  );
}

export default DocumentListItem;
