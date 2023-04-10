import React from "react";
import { Col, Card, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

function DocumentListItem({ document, handleDelete }) {
  return (
    <Col>
      <Card className="h-full">
        <Card.Body className="h-full flex flex-col">
          <Card.Title className="text-lg font-bold mb-2">
            {document.title}
          </Card.Title>
          <div className="flex gap-2">
            <Link to={`/document/${document._id}`}>
              <Button variant="outline-primary" size="sm">
                Edit
              </Button>
            </Link>
            <Button
              variant="outline-danger"
              size="sm"
              onClick={() => {
                handleDelete(document);
              }}
            >
              Delete
            </Button>
          </div>
        </Card.Body>
      </Card>
    </Col>
  );
}

export default DocumentListItem;
