import "../../../styles/listPage.scss";
import React, { useEffect, useState } from "react";
import { fetchDocuments } from "../../../api/documents/fetchDocuments";
import { deleteDocument } from "../../../api/documents/deleteDocument";
import DocumentList from "./DocumentList";
import { updateDoc } from "../../../api/documents/updateDocument";

function ListContainer({ query }) {
  const [documents, setDocuments] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await fetchDocuments(query);
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

  return <DocumentList documents={documents} handleDelete={handleDelete} />;
}

export default ListContainer;