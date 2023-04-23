import "../../../styles/tags-bar.scss";

import React, { useEffect, useRef } from "react";
import { Row, Col } from "react-bootstrap";
import Tagify from "@yaireo/tagify";
import { AiOutlineTags } from "react-icons/ai";

function TagsBar({ tagging, setTagging, whitelist }) {
  const inputRef = useRef();
  useEffect(() => {
    const tagify = new Tagify(inputRef.current, {
      delimiters: ",",
      maxTags: 5,
      whitelist,
      enforceWhitelist: true,
      dropdown: {
        enabled: 0,
        maxItems: 5,
        classname: "tags-look",
        closeOnSelect: false,
        highlightFirst: true,
      },
      callbacks: {
        add: onTagsChange,
        remove: onTagsChange,
      },
    });

    return () => {
      tagify.destroy();
    };
  }, [whitelist]);

  const onTagsChange = (e) => {
    const newTag = e.detail.tagify.value;
    setTagging(newTag.map((tag) => tag.value));
  };

  return (
    <div className="tags-container">
      <span style={{ color: "grey" }}>Add tags and press Enter...</span>
      <input
        ref={inputRef}
        className="tagify"
        name="tags"
        value={tagging}
        onChange={(e) => {}}
      />
    </div>
  );
}

export default TagsBar;
