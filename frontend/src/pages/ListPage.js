import React, { useEffect, useState } from "react";
import { fetchDocuments } from "../api/fetchDocuments";
import { deleteDocument } from "../api/deleteDocument";
import { createDocument } from "../api/createDocument";
import DocumentList from "../components/Document/DocumentList";
import { Button } from "react-bootstrap";

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

  const handleDelete = async (document) => {
    const result = await deleteDocument(document._id);
    setDocuments(documents.filter((doc) => doc._id !== document._id));
  };

  const handleCreate = async () => {
    const result = await createDocument();
    setDocuments([...documents, result.document]);
  };

  return (
    <div className="list-page p-4 flex flex-col gap-4">
      <h1 className="text-2xl font-bold">My Notes</h1>
      <Button onClick={handleCreate}>create</Button>
      <DocumentList documents={documents} handleDelete={handleDelete} />
    </div>
  );
}

export default ListPage;
