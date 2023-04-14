import React, { useEffect, useState } from "react";
import { fetchDocuments } from "../api/documents/fetchDocuments";
import { deleteDocument } from "../api/documents/deleteDocument";
import { createDocument } from "../api/documents/createDocument";
import DocumentList from "../components/ListPage/Document/DocumentList";
import { Button } from "react-bootstrap";
import { AiOutlinePlus } from "react-icons/ai";
import { updateDoc } from "../api/documents/updateDocument";

function FavoritePage() {
  const [documents, setDocuments] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await fetchDocuments("is_favorite=true");
        setDocuments(result);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);

  const handleDelete = async (document) => {
    setDocuments(documents.filter((doc) => doc._id !== document._id));
    if (document.is_trash) return await deleteDocument(document._id);
    await updateDoc({ is_trash: true, document_id: document._id });
  };

  const handleCreate = async () => {
    const result = await createDocument();
    setDocuments((documents) => [...documents, result.document]);
  };

  return (
    <div className="list-page p-4 flex flex-col gap-4">
      <h1 className="mb-4 text-2xl font-bold">FavoritePage</h1>
      <DocumentList documents={documents} handleDelete={handleDelete} />
    </div>
  );
}

export default FavoritePage;
