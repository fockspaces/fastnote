import "../../../styles/tags-bar.scss";

import React, { useEffect, useRef } from "react";
import Tagify from "@yaireo/tagify";

function TagsBar({ tagging, setTagging, whitelist }) {
  const inputRef = useRef();
  useEffect(() => {
    const tagify = new Tagify(inputRef.current, {
      delimiters: ",",
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
      <input
        ref={inputRef}
        className="tagify"
        name="tags"
        value={tagging}
        onChange={(e) => {}}
        placeholder={'Add tags here...'}
      />
    </div>
  );
}

export default TagsBar;
