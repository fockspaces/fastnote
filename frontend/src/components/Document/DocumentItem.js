import React, { useState } from "react";
import { Col, Card, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { saveDocument } from "../../api/saveDocument";

function DocumentListItem({ document, handleDelete }) {
  const [title, setTitle] = useState(document.title);
  const handleTitleUpdate = async () => {
    const result = await saveDocument({
      ...document,
      title,
      updateTitle: true,
    });
    console.log(result);
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
                }
              }}
              value={title}
            />
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
