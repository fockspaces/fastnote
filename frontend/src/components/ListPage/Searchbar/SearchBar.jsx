import "../../../styles/search-bar.scss";
import React, { useState, useEffect } from "react";
import { Form, FormControl } from "react-bootstrap";
import { FaSearch } from 'react-icons/fa';

function SearchBar({ setKeyword, setTagging }) {
  const [search, setSearch] = useState("");

  const searchText = () => {
    setKeyword(`&keyword=${search}`);
    setTagging([]);
  };

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      searchText();
    }, 500);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [search]);

  return (
    <div className="search-bar mb-3">
      <Form className="d-inline" onSubmit={(e) => e.preventDefault()}>
        <div className="search-input-container">
          <FormControl
            type="text"
            placeholder="Search notes..."
            className="mr-sm-2 search-input"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <FaSearch className="search-icon" />
        </div>
      </Form>
    </div>
  );
}

export default SearchBar;
