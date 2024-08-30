import React, { useContext, useEffect, useState } from "react";
import { SearchContext } from "../provider/SearchContext";
import useDebounce from "../hooks/useDebounce";

const SearchBox = () => {
  const { query, setQuery } = useContext(SearchContext)!;
  const [inputValue, setInputValue] = useState(query);

  //Bonus: debounce
  const debouncedInputValue = useDebounce(inputValue, 500);

  useEffect(() => {
    setQuery(debouncedInputValue as string);
  }, [debouncedInputValue, setQuery]);

  useEffect(() => {
    //handle focus on search box when user presses ctrl/cmd + /
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === "/") {
        const searchBox = document.getElementById("search-box");
        searchBox?.focus();
        e.preventDefault();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);

  //search box input change handler
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  return (
    <div className="search-box-wrapper">
      <input
        id="search-box"
        type="text"
        value={inputValue}
        onChange={handleSearchChange}
        placeholder="Search places..."
        className="search-box"
      />
      <span className="search-ctrl">Ctrl + /</span>
    </div>
  );
};

export default SearchBox;
