import React, { useEffect, useState } from "react";
import { fetchDocuments } from "../../../api/documents/fetchDocuments";
import { deleteDocument } from "../../../api/documents/deleteDocument";
import DocumentList from "./DocumentList";
import { updateDoc } from "../../../api/documents/updateDocument";
import SearchBar from "../utils/SearchBar";
import TagsBar from "../utils/TagsBar";
import { getAllTags, tagsHelper } from "../../../utils/tagsHelper";
import NoDocumentsHint from "../utils/NoDocuments";
import TitleList from "../utils/TitleList";
import Logo from "../../Logo";

function ListContainer({ query, is_trash }) {
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

  const handleDelete = async (document, notToDelete) => {
    setDocuments(documents.filter((doc) => doc._id !== document._id));
    if (notToDelete)
      return await updateDoc({ is_trash: false, document_id: document._id });
    if (document.is_trash) return await deleteDocument(document._id);
    await updateDoc({ is_trash: true, document_id: document._id });
  };

  return (
    <div className="list-container mt-4">
      <div className="left-sidebar">
        <Logo />
        <SearchBar setKeyword={setKeyword} setTagging={setTagging} />
        <TagsBar
          tagging={tagging}
          setTagging={setTagging}
          whitelist={getAllTags(documents)}
        />
        <TitleList documents={documents} />
      </div>
      <div className="right-side-list">
        {documents.length === 0 ? (
          <NoDocumentsHint is_trash={is_trash} />
        ) : (
          <DocumentList
            tagging={tagging}
            setTagging={setTagging}
            documents={documents}
            handleDelete={handleDelete}
            is_trash={is_trash}
          />
        )}
      </div>
    </div>
  );
}

export default ListContainer;
