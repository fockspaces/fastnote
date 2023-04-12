import React, { useEffect, useState } from "react";
import { fetchDocuments } from "../api/documents/fetchDocuments";
import { deleteDocument } from "../api/documents/deleteDocument";
import { createDocument } from "../api/documents/createDocument";
import DocumentList from "../components/Document/DocumentList";
import { Button } from "react-bootstrap";
import { AiOutlinePlus } from "react-icons/ai";

function DocumentsList() {
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
    setDocuments(documents.filter((doc) => doc._id !== document._id));
    await deleteDocument(document._id);
  };

  const handleCreate = async () => {
    const newDocument = {
      _id: Math.random(),
      title: "New Document",
      tags: ["default tag"],
    };
    // improve UX
    setDocuments((documents) => [...documents, newDocument]);
    const result = await createDocument();
    setDocuments((documents) => [...documents.slice(0, -1), result.document]);
  };

  return (
    <div className="list-page p-4 flex flex-col gap-4">
      <h1 className="text-2xl font-bold">FastNote</h1>
      <Button
        className="mb-3"
        variant="outline-dark"
        size="sm"
        onClick={handleCreate}
      >
        <AiOutlinePlus />
        create
      </Button>
      <DocumentList documents={documents} handleDelete={handleDelete} />
    </div>
  );
}

export default DocumentsList;
