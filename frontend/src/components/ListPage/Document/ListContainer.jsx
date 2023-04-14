import "../../../styles/listPage.scss";
import React, { useEffect, useState } from "react";
import { fetchDocuments } from "../../../api/documents/fetchDocuments";
import { deleteDocument } from "../../../api/documents/deleteDocument";
import DocumentList from "./DocumentList";
import { updateDoc } from "../../../api/documents/updateDocument";
import SearchBar from "../Searchbar/SearchBar";

function ListContainer({ query }) {
  const [documents, setDocuments] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const result = await fetchDocuments(query);
      setDocuments(result);
    };
    fetchData();
  }, [query]);

  const handleSearch = (keyword) => {
    const fetchData = async () => {
      const result = await fetchDocuments(query + `&keyword=${keyword}`);
      setDocuments(result);
    };
    fetchData();
  };

  const handleDelete = async (document) => {
    setDocuments(documents.filter((doc) => doc._id !== document._id));
    if (document.is_trash) return await deleteDocument(document._id);
    await updateDoc({ is_trash: true, document_id: document._id });
  };

  return (
    <div className="list-container">
      <SearchBar handleSearch={handleSearch} />
      <DocumentList documents={documents} handleDelete={handleDelete} />
    </div>
  );
}

export default ListContainer;
