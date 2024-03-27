import React, { useState, useEffect, useRef } from "react";
import useDidMountEffect from "./helper/useDidMountEffect";

function SearchContainer({ searchResults, selectCity, getSearchResults }) {
  const [value, setValue] = useState("");
  let results = null;
  const [showSearchResults, setShowSearchResults] = useState(false);
  const [hoverResults, setHoverResults] = useState(false);

  useDidMountEffect(() => {
    getSearchResults(value);
  }, [value]);

  const handleChange = (e) => {
    setValue(e.target.value);
  };

  const handleClick = (index) => {
    selectCity(searchResults[index].url);
    setShowSearchResults(false);
    setValue("");
  };

  if (searchResults) {
    results = searchResults.map((result, index) => {
      return (
        <div
          className="search-result"
          onClick={() => {
            handleClick(index);
          }}
        >
          <div className="search-result-content">{`${result.name}, ${result.region}`}</div>
        </div>
      );
    });
  }

  return (
    <div className="search-component">
      <input
        className="search-bar"
        type="text"
        placeholder="search location"
        // onBlur={() => {
        //   if (value !== "") {
        //     setShowSearchResults(false);
        //   }
        // }}
        onFocus={() => {
          setShowSearchResults(true);
        }}
        onBlur={
          !hoverResults
            ? () => {
                setShowSearchResults(false);
              }
            : null
        }
        onChange={handleChange}
        value={value}
      />
      <div
        className="search-results"
        onMouseEnter={() => {
          setHoverResults(true);
        }}
        onMouseLeave={() => {
          setHoverResults(false);
        }}
      >
        {showSearchResults ? results : null}
      </div>
    </div>
  );
}

export default SearchContainer;
