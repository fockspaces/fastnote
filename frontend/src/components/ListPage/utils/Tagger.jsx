import React, { useState } from "react";
import { OverlayTrigger, Tooltip } from "react-bootstrap";

import "../../../styles/ListPage/taggerStyles.scss";

const maximun_tag = 5;

const Tagger = ({ tags, tagging, setTagging }) => {
  const [collapsed, setCollapsed] = useState(true);

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

  const renderTag = (tag) => {
    return (
      <span
        className={`badge ${
          isTagSelected(tag) ? "bg-dark" : "bg-secondary"
        } `}
        onClick={() => {
          toggleTagging(tag);
        }}
      >
        {tag.length <= 10 ? tag : `${tag.slice(0, 10)}...`}
      </span>
    );
  };

  return (
    <div className="tags-container">
      {visibleTags.map((tag, index) =>
        tag.length > maximun_tag ? (
          <OverlayTrigger
            key={index}
            placement="top"
            overlay={<Tooltip id={`tooltip-${tag}`}>{tag}</Tooltip>}
          >
            {renderTag(tag)}
          </OverlayTrigger>
        ) : (
          <React.Fragment key={index}>{renderTag(tag)}</React.Fragment>
        )
      )}

      {tags.length > maximun_tag && (
        <button
          className="btn p-0 tag-toggler-button"
          onClick={handleToggleCollapse}
        >
          {collapsed ? "...more" : "... show less"}
        </button>
      )}
    </div>
  );
};

export default Tagger;
