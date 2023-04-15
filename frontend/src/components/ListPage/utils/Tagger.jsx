import React, { useState } from "react";
import { FaPlus, FaMinus } from "react-icons/fa";

const Tagger = ({ tags }) => {
  const [collapsed, setCollapsed] = useState(true);
  const visibleTags = collapsed ? tags.slice(0, 5) : tags;

  const handleToggleCollapse = () => {
    setCollapsed(!collapsed);
  };

  return (
    <div className="mt-2">
      {visibleTags.map((tag, index) => (
        <span key={index} className="badge bg-secondary me-1">
          {tag}
        </span>
      ))}
      {tags.length > 5 && (
        <button className="btn  p-0" onClick={handleToggleCollapse}>
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
