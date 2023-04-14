import React, { useState, useEffect } from "react";
import { Form, FormControl } from "react-bootstrap";

function SearchBar({ handleSearch }) {
  const [search, setSearch] = useState("");

  const searchText = () => {
    handleSearch(search);
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
        <FormControl
          type="text"
          placeholder="Search notes..."
          className="mr-sm-2"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </Form>
    </div>
  );
}

export default SearchBar;
