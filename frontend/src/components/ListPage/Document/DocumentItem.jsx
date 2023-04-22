import "../../../styles/ListPage/documentsItem.scss";
import React, { useEffect, useState } from "react";
import { Col, Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import { IoIosBookmark } from "react-icons/io";
import { updateDoc } from "../../../api/documents/updateDocument";
import Tagger from "../utils/Tagger";
import { useDrag } from "react-dnd";

function DocumentListItem({
  document,
  tagging,
  setTagging,
  setIsDraggingDocument,
}) {
  const [title, setTitle] = useState(document.title);
  const [currentDocument, setCurrentDocument] = useState(document);
  const [isComposing, setIsComposing] = useState(false);

  const [{ isDragging }, drag] = useDrag(() => ({
    type: "document",
    item: { ...document },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  useEffect(() => {
    setIsDraggingDocument(isDragging);
  }, [isDragging, setIsDraggingDocument]);

  const handleTitleUpdate = async () => {
    await updateDoc({ title, document_id: document._id });
  };

  const handleFavoriteUpdate = async (e) => {
    e.stopPropagation();
    const result = await updateDoc({
      is_favorite: !currentDocument.is_favorite,
      document_id: currentDocument._id,
    });
    setCurrentDocument(result.data);
  };

  const dragPreview = {
    zIndex: 10, // Set the zIndex value lower than the TrashBin's zIndex
  };

  return (
    <Col
      className="document-item"
      ref={drag}
      style={{
        ...(isDragging ? dragPreview : {}),
        opacity: isDragging ? 0.5 : 1,
      }}
    >
      <Card className="h-full position-relative hover-effect">
        <div className="favorite-icon position-absolute top-0 end-0">
          <label htmlFor={`favorite-${currentDocument._id}`}>
            <input
              type="checkbox"
              id={`favorite-${currentDocument._id}`}
              checked={currentDocument.is_favorite}
              onChange={(e) => {
                handleFavoriteUpdate(e);
              }}
              style={{ display: "none" }}
            />
            {currentDocument.is_favorite ? (
              <span className="bookmark-icon text-saturated-orange me-2">
                <IoIosBookmark />
              </span>
            ) : (
              <span className="bookmark-icon text-secondary me-2">
                <IoIosBookmark />
              </span>
            )}
          </label>
        </div>

        <Card.Body className="h-full flex flex-col">
          <Card.Title className="text-lg font-bold mb-2">
            <input
              onChange={(e) => setTitle(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !isComposing) {
                  e.target.blur(); // remove focus
                }
              }}
              onBlur={handleTitleUpdate}
              onCompositionStart={() => setIsComposing(true)}
              onCompositionEnd={() => setIsComposing(false)}
              value={title}
            />
            <div className="document-meta d-flex align-items-center justify-content-between">
              <div className="document-date">
                {new Date(document.createdAt).toLocaleDateString("en-GB", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })}
              </div>
            </div>
          </Card.Title>
          <Link to={`/document/${currentDocument._id}`} className="card-link">
            {document.description && (
              <Card.Text>
                {document.description.length > 210
                  ? document.description.slice(0, 210) + "..."
                  : document.description}
              </Card.Text>
            )}
          </Link>
          {document.tags && (
            <Tagger
              tags={currentDocument.tags}
              tagging={tagging}
              setTagging={setTagging}
            />
          )}
        </Card.Body>
      </Card>
    </Col>
  );
}

export default DocumentListItem;
