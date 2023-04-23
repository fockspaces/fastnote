import React, { useState } from "react";
import { FaPlus, FaMinus } from "react-icons/fa";
import "../../../styles/ListPage/taggerStyles.scss";

const maximun_tag = 10;

const Tagger = ({ tags, tagging, setTagging }) => {
  const [collapsed, setCollapsed] = useState(true);
  const [hoveredTag, setHoveredTag] = useState(null);

  const visibleTags = collapsed ? tags.slice(0, maximun_tag) : tags;

  const handleToggleCollapse = () => {
    setCollapsed(!collapsed);
  };

  const isTagSelected = (tag) => {
    return tagging.includes(tag);
  };

  const toggleTagging = (tag) => {
    setTagging((currentTagging) => {
      if (isTagSelected(tag)) {
        return currentTagging.filter((t) => t !== tag);
      } else {
        return [...currentTagging, tag];
      }
    });
  };

  return (
    <div className="tags-container">
      {visibleTags.map((tag, index) => (
        <span
          key={index}
          className={`badge ${
            isTagSelected(tag) ? "bg-dark" : "bg-secondary"
          } `}
          onClick={() => {
            toggleTagging(tag);
          }}
          onMouseEnter={() => setHoveredTag(tag)} // Add this
          onMouseLeave={() => setHoveredTag(null)} // Add this
        >
          {hoveredTag === tag || tag.length <= 10
            ? tag
            : `${tag.slice(0, 10)}...`}
        </span>
      ))}
      {tags.length > maximun_tag && (
        <button
          className="btn p-0 tag-toggler-button"
          onClick={handleToggleCollapse}
        >
          {collapsed ? (
            <>
              ...
              <FaPlus />
            </>
          ) : (
            <FaMinus />
          )}
        </button>
      )}
    </div>
  );
};

export default Tagger;
