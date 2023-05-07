import "../../styles/ProfilePage/TagList.scss";
import React, { useEffect, useState } from "react";
import { fetchTags } from "../../api/documents/fetchTags";
import { Button, Modal } from "react-bootstrap";
import TagModal from "./TagModal";
import { updateTag } from "../../api/documents/updateTag";

const TagList = () => {
  const [tags, setTags] = useState([]);
  const [selectedTag, setSelectedTag] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const message = { title: "tags", body: "edit tag", confirm: "edit" };

  const handleUpdate = async (newTagName) => {
    console.log(newTagName);
    if (!selectedTag || !newTagName) return;
    const isSuccess = await updateTag(selectedTag, newTagName);
    if (isSuccess) {
      const newTags = tags.map((tag) =>
        tag === selectedTag ? newTagName : tag
      );
      setTags(newTags);
      setSelectedTag(null);
      setShowModal(false);
    }
  };

  const handleDelete = async () => {};

  const handleTagClick = (tag) => {
    setSelectedTag(tag);
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
      <h1>Tags</h1>
      {renderTags()}
      <TagModal
        showModal={showModal}
        setShowModal={setShowModal}
        message={message}
        handleUpdate={handleUpdate}
        oldTagName={selectedTag}
        handleDelete={handleDelete}
      />
    </div>
  );
};

export default TagList;
