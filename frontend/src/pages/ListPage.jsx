import React, { useEffect, useState } from "react";
import { fetchDocuments } from "../api/documents/fetchDocuments";
import { deleteDocument } from "../api/documents/deleteDocument";
import { createDocument } from "../api/documents/createDocument";
import DocumentList from "../components/ListPage/Document/DocumentList";
import { Button } from "react-bootstrap";
import { AiOutlinePlus } from "react-icons/ai";
import { updateDoc } from "../api/documents/updateDocument";

function ListPage() {
  const [documents, setDocuments] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await fetchDocuments('is_trash=false');
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
    const result = await createDocument();
    setDocuments((documents) => [...documents, result.document]);
  };

  const handleToTrash = async (document) => {
    setDocuments(documents.filter((doc) => doc._id !== document._id));
    await updateDoc({ is_trash: true, document_id: document._id });
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
      <DocumentList
        documents={documents}
        handleDelete={handleDelete}
        handleToTrash={handleToTrash}
      />
    </div>
  );
}

export default ListPage;
