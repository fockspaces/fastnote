import React from "react";
import "../../../styles/EditPage/TableOfContent.scss";

const TableOfContents = ({ headings, onHeadingClick }) => {
  return (
    <div className="table-of-contents">
      <ul>
        {headings.map((heading, index) => (
          <li
            key={index}
            className={`toc-item level-${heading.level}`}
            onClick={() => onHeadingClick(heading)}
          >
            {heading.text}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TableOfContents;
