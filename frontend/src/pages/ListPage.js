import { useEffect, useState } from "react";
import { fetchDocuments } from "../api/fetchDocuments";
import { Row, Col, Card, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

function ListPage() {
  const [documents, setDocuments] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await fetchDocuments();
        setDocuments(result);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="list-page p-4 flex flex-col gap-4">
      <h1 className="text-2xl font-bold">My Notes</h1>
      <Row xs={1} sm={2} md={3} className="g-4">
        {documents.map((doc) => (
          <Col key={doc._id}>
            <Card key={doc._id} className="h-full">
              <Card.Body className="h-full flex flex-col">
                <Card.Title className="text-lg font-bold mb-2">
                  {doc.title}
                </Card.Title>
                <div className="flex gap-2">
                  <Link to={`/document/${doc._id}`}>
                    <Button variant="outline-primary" size="sm">
                      Edit
                    </Button>
                  </Link>
                  <Button variant="outline-danger" size="sm">
                    Delete
                  </Button>
                </div>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
}

export default ListPage;
