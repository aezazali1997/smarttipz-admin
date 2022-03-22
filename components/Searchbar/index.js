import React from 'react'
import { SearchSVG } from 'assets/SVGs';

const Searchbar = ({ search, onChange,placeholder='Search Messages' }) => {
    return (
      <div className="relative w-full">
        <input
          className="searchbar"
          onChange={(e) => onChange(e.target.value)}
          value={search}
          type="search"
          name="search"
          placeholder={placeholder}
        />
        <SearchSVG
          classNames={
            "w-4 h-4 absolute right-0 top-0 mt-5 mr-4 pointer-events-none text-gray-500"
          }
        />
      </div>
    );
}

export default Searchbar;
