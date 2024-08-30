import React, { useContext, useState } from "react";
import { SearchContext } from "../provider/SearchContext";

const Pagination: React.FC = () => {
  const { page, setPage, limit, setLimit, getPlaces, totalItems } =
    useContext(SearchContext)!;

  const [inputLimit, setInputLimit] = useState<number>(limit);

  const totalPages = Math.ceil(totalItems / limit);

  const handlePageChange = (newPage: number) => {
    if (newPage > 0 && newPage <= totalPages) {
      setPage(newPage);
    }
  };

  const handleLimitChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newLimit = Number(e.target.value);

    setInputLimit(newLimit);
  };

  const handleSearchClick = () => {
    // Set the limit and trigger API call
    if (inputLimit <= 10) {
      setLimit(inputLimit);
      getPlaces(); // Trigger API call
    } else {
      alert("Please enter a value between 1 and 10");
    }
  };

  return (
    <div className="pagination-wrapper">
      <div className="pagination-controls">
        <button
          onClick={() => handlePageChange(page - 1)}
          disabled={page === 1}
        >
          Previous
        </button>
        <span>
          Page {page} of {totalPages}
        </span>
        <button
          onClick={() => handlePageChange(page + 1)}
          disabled={page === totalPages}
        >
          Next
        </button>
      </div>
      <div className="search-container">
        <input
          type="number"
          value={inputLimit}
          onChange={handleLimitChange}
          min={1}
          max={10}
          className="limit-input"
        />
        <span className="search-icon" onClick={handleSearchClick}>
          {" "}
          🔍{" "}
        </span>
      </div>
    </div>
  );
};

export default Pagination;
