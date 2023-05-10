import "../../styles/TagsPage/TagList.scss";
import React, { useEffect, useState } from "react";
import { fetchTags } from "../../api/documents/fetchTags";
import { Button, Modal } from "react-bootstrap";
import TagModal from "./TagModal";
import { updateTags } from "../../api/documents/updateTag";
import TagsSelectionModal from "./TagsSelectionModal";

const TagList = () => {
  const [tags, setTags] = useState([]);
  const [selectedTag, setSelectedTag] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [showTagsSelectionModal, setShowTagsSelectionModal] = useState(false);
  const [modalKey, setModalKey] = useState(0);

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

  const handleDelete = async () => {};

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
    const groupedTags = groupTagsByPrefix(tags);

    // Sort the prefixes (keys) alphabetically
    const sortedPrefixes = Object.keys(groupedTags).sort();
    return (
      <div className="tags-container">
        {sortedPrefixes.map((prefix) => (
          <div key={prefix} className="tags-group">
            <h3>{prefix}</h3>
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
      <h1>Tags</h1>{" "}
      <Button
        variant="outline-dark mb-3"
        onClick={() => {
          setShowTagsSelectionModal(true);
          setModalKey((prevKey) => prevKey + 1);
        }}
      >
        Merge Tags
      </Button>
      <TagsSelectionModal
        showModal={showTagsSelectionModal}
        setShowModal={setShowTagsSelectionModal}
        handleUpdate={handleUpdate}
        tags={tags}
        key={modalKey + 1}
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
