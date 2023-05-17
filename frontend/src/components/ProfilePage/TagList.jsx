import "../../styles/TagsPage/TagList.scss";
import React, { useEffect, useState } from "react";
import { fetchTags } from "../../api/documents/fetchTags";
import { Button, Modal } from "react-bootstrap";
import TagModal from "./TagModal";
import { updateTags } from "../../api/documents/updateTag";
import TagsSelectionModal from "./TagsSelectionModal";
import TagsDeletionModal from "./TagsDeletionModal";
import SearchBar from "../ListPage/utils/SearchBar";

const TagList = () => {
  const [tags, setTags] = useState([]);
  const [selectedTag, setSelectedTag] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [showTagsSelectionModal, setShowTagsSelectionModal] = useState(false);
  const [showTagsDeleteModal, setShowTagsDeleteModal] = useState(false);
  const [modalKey, setModalKey] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
console.log(searchTerm);
  const handleSearchTerm = (keyword) => {
    setSearchTerm(keyword.slice(9));
  };

  const handleUpdate = async (newTagName, selectedTags) => {
    console.log({ newTagName, selectedTags });
    if (!selectedTags.length || !newTagName) return;
    const isSuccess = await updateTags(selectedTags, newTagName);
    if (isSuccess) {
      const newTags = tags.filter((tag) => !selectedTags.includes(tag));
      if (!tags.includes(newTagName) || selectedTags.includes(newTagName)) {
        newTags.push(newTagName);
      }
      setTags(newTags);
      setSelectedTag(null);
      setShowModal(false);
    }
  };

  const handleDelete = async (selectedTags) => {
    if (!selectedTags.length) return;
    const isSuccess = await updateTags(selectedTags);
    if (isSuccess) {
      const newTags = tags.filter((tag) => !selectedTags.includes(tag));
      setTags(newTags);
      setSelectedTag(null);
      setShowModal(false);
    }
  };

  const handleTagClick = (tag) => {
    setSelectedTag(tag);
    setModalKey((prevKey) => prevKey + 1);
    setShowModal(true);
  };

  useEffect(() => {
    const fetchData = async () => {
      const fetchedTags = await fetchTags();
      setTags(fetchedTags);
    };
    fetchData();
  }, []);

  const groupTagsByPrefix = (tags) => {
    const groupedTags = tags.reduce((acc, tag) => {
      const prefix = tag[0].toUpperCase();
      if (!acc[prefix]) {
        acc[prefix] = [];
      }
      acc[prefix].push(tag);
      return acc;
    }, {});

    // Sort tags alphabetically within each group
    for (const prefix in groupedTags) {
      groupedTags[prefix].sort();
    }

    return groupedTags;
  };
  const renderTags = () => {
    const filteredTags = tags.filter((tag) =>
      new RegExp(searchTerm, "i").test(tag)
    );
    const groupedTags = groupTagsByPrefix(filteredTags);

    // Sort the prefixes (keys) alphabetically
    const sortedPrefixes = Object.keys(groupedTags).sort();
    return (
      <div className="tags-container">
        {sortedPrefixes.map((prefix) => (
          <div key={prefix} className="tags-group">
            <h2>{prefix}</h2>
            <ul>
              {groupedTags[prefix].map((tag) => (
                <li
                  key={tag}
                  onClick={() => {
                    handleTagClick(tag);
                  }}
                >
                  {tag}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="tags-list-page">
      <div className="tags-actions">
      <SearchBar setKeyword={handleSearchTerm} setTagging={() => {}} placeholder={"search for tags..."} />
      <Button
        className="merge-tags-btn"
        variant="outline-dark mb-3 mr-3"
        onClick={() => {
          setShowTagsSelectionModal(true);
          setModalKey((prevKey) => prevKey + 1);
        }}
      >
        Merge Tags
      </Button>
      <Button
        className="merge-tags-btn"
        variant="outline-dark mb-3"
        onClick={() => {
          setShowTagsDeleteModal(true);
          setModalKey((prevKey) => prevKey + 1);
        }}
      >
        Remove Tags
      </Button>
    </div>
      <TagsSelectionModal
        showModal={showTagsSelectionModal}
        setShowModal={setShowTagsSelectionModal}
        handleUpdate={handleUpdate}
        tags={tags}
        key={modalKey + 1}
      />
      <TagsDeletionModal
        showModal={showTagsDeleteModal}
        setShowModal={setShowTagsDeleteModal}
        handleUpdate={handleDelete}
        tags={tags}
        key={modalKey + 2}
      />
      {renderTags()}
      <TagModal
        showModal={showModal}
        setShowModal={setShowModal}
        handleUpdate={handleUpdate}
        oldTagName={selectedTag}
        handleDelete={handleDelete}
        key={modalKey}
      />
    </div>
  );
};

export default TagList;
