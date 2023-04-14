import React, { useState } from "react";
import { Col, Card, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { FaEdit, FaTrash, FaStar, FaRegStar } from "react-icons/fa";
import { updateDoc } from "../../../api/documents/updateDocument";

function DocumentListItem({ document, handleDelete }) {
  const [title, setTitle] = useState(document.title);
  const [currentDocument, setCurrentDocument] = useState(document);

  const handleTitleUpdate = async () => {
    await updateDoc({ title, document_id: document._id });
  };

  const handleFavoriteUpdate = async () => {
    const result = await updateDoc({
      is_favorite: !currentDocument.is_favorite,
      document_id: currentDocument._id,
    });
    setCurrentDocument(result.data);
  };

  // if (currentDocument.is_trash) return;
  return (
    <Col style={{ minWidth: "350px", maxWidth: "500px" }}>
      <Card className="h-full">
        <Card.Body className="h-full flex flex-col">
          <Card.Title className="text-lg font-bold mb-2">
            <input
              onChange={(e) => setTitle(e.target.value)}
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
            <Link to={`/document/${currentDocument._id}`}>
              <Button variant size="sm">
                <FaEdit /> Edit
              </Button>
            </Link>
            <Link>
              <Button
                variant
                size="sm"
                onClick={() => handleDelete(currentDocument)}
              >
                <FaTrash /> Delete
              </Button>
            </Link>
            <label htmlFor={`favorite-${currentDocument._id}`}>
              <input
                type="checkbox"
                id={`favorite-${currentDocument._id}`}
                checked={currentDocument.is_favorite}
                onChange={handleFavoriteUpdate}
                style={{ display: "none" }}
              />
              {currentDocument.is_favorite ? (
                <span className="text-warning me-2">
                  <FaStar />
                </span>
              ) : (
                <span className="text-secondary me-2">
                  <FaRegStar />
                </span>
              )}
              favorite
            </label>
          </div>
          <div className="mt-2">
            {currentDocument.tags.map((tag, index) => (
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
