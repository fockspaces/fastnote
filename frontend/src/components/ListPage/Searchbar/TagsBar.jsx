import "../../../styles/tagsbar.scss";
// import "@yaireo/tagify/dist/tagify.css";

import React, { useEffect, useRef } from "react";
import { Row, Col } from "react-bootstrap";
import Tagify from "@yaireo/tagify";

function TagsBar({ tagging, setTagging, whitelist }) {
  const inputRef = useRef();
  useEffect(() => {
    const tagify = new Tagify(inputRef.current, {
      delimiters: ",",
      maxTags: 10,
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
      <Row>
        <Col>
          <input
            ref={inputRef}
            className="tagify"
            name="tags"
            placeholder="Add tags and press Enter"
            value={tagging}
            onChange={(e) => {}}
          />
        </Col>
      </Row>
    </div>
  );
}

export default TagsBar;