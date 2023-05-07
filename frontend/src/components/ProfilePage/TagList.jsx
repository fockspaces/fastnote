import "../../styles/ProfilePage/TagList.scss";
import React, { useEffect, useState } from "react";
import { fetchTags } from "../../api/documents/fetchTags";
import { Button, Modal } from "react-bootstrap";

const TagList = () => {
  const [tags, setTags] = useState([]);
  const [showModal, setShowModal] = useState(false);

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
    console.log(groupedTags);

    // Sort the prefixes (keys) alphabetically
    const sortedPrefixes = Object.keys(groupedTags).sort();

    return (
      <div className="tags-container">
        {sortedPrefixes.map((prefix) => (
          <div key={prefix} className="tags-group">
            <h3>{prefix}</h3>
            <ul>
              {groupedTags[prefix].map((tag) => (
                <li key={tag}>
                  {tag}
                  <Button
                    className="edit-button"
                    variant="link"
                    size="sm"
                    onClick={() => console.log("d")}
                  >
                    Edit
                  </Button>
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
    </div>
  );
};

export default TagList;
