import SearchContainer from "./SearchContainer";
import React from "react";

function Header({ searchResults, getSearchResults, selectCity, time, date }) {
  return (
    <>
      <header className="header">
        <h2 className="title-logo">My Forecast</h2>
        <div className="search-container-placeholder">
          <SearchContainer
            searchResults={searchResults}
            selectCity={selectCity}
            getSearchResults={getSearchResults}
          />
        </div>
        <div className="date-and-time">
          <h3 className="time">{time}</h3>
          <span className="date">{date}</span>
        </div>
      </header>
    </>
  );
}

export default Header;
