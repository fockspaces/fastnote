import "../../../styles/listPage.scss";
import React, { useEffect, useState } from "react";
import { fetchDocuments } from "../../../api/documents/fetchDocuments";
import { deleteDocument } from "../../../api/documents/deleteDocument";
import DocumentList from "./DocumentList";
import { updateDoc } from "../../../api/documents/updateDocument";
import SearchBar from "../Searchbar/SearchBar";
import TagsBar from "../Searchbar/TagsBar";
import { getAllTags, tagsHelper } from "../../../utils/tagsHelper";

function ListContainer({ query }) {
  const [documents, setDocuments] = useState([]);
  const [keyword, setKeyword] = useState("");
  const [tagging, setTagging] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const result = await fetchDocuments(
        query + keyword + tagsHelper(tagging)
      );
      setDocuments(result);
    };
    fetchData();
  }, [query, keyword, tagging]);

  const handleDelete = async (document) => {
    setDocuments(documents.filter((doc) => doc._id !== document._id));
    if (document.is_trash) return await deleteDocument(document._id);
    await updateDoc({ is_trash: true, document_id: document._id });
  };

  return (
    <div className="list-container mt-4">
      <SearchBar setKeyword={setKeyword} setTagging={setTagging} />
      <TagsBar
        tagging={tagging}
        setTagging={setTagging}
        whitelist={getAllTags(documents)}
      />
      <DocumentList documents={documents} handleDelete={handleDelete} />
    </div>
  );
}

export default ListContainer;
