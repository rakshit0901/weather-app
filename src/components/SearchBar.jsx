import React from 'react';
import { FaSearch } from 'react-icons/fa';

const SearchBar = ({ location, setLocation, searchLocation }) => {
  return (
    <div className="search">
      <div className="search-input-wrapper">
        <input
          value={location}
          onChange={event => setLocation(event.target.value)}
          onKeyPress={searchLocation}
          placeholder="Enter Location"
          type="text"
        />
        <FaSearch className="search-icon" onClick={searchLocation} />
      </div>
    </div>
  );
};

export default SearchBar;
