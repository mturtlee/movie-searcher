import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";

const SearchBar = ({ onSearch }) => {
  const [input, setInput] = useState("");

  const handleInputChange = (e) => {
    setInput(e.target.value);
  };

  const handleSearch = () => {
    onSearch(input);
    setInput("");
  };
  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      onSearch(input);
      setInput("");
    }
  };

  return (
    <div className="input-wrapper">
      <FaSearch id="search-icon" onClick={handleSearch} />
      <input
        placeholder="Type to search..."
        value={input}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
      />
    </div>
  );
};

export default SearchBar;
