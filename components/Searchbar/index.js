import React from 'react'
import { SearchSVG, CroseIcon } from "assets/SVGs";

const Searchbar = ({
  search,
  onChange,
  placeholder = "Type here...",
  fetch,
}) => {
  return (
    <div className="relative w-full">
      <input
        className="searchbar"
        onChange={(e) => {
          onChange(e.target.value);
        }}
        onKeyDown={(e) => {
          if (e.key == "Enter") {
            fetch(search);
          }
        }}
        value={search}
        type="text"
        name="search"
        placeholder={placeholder}
      />
      {search.length > 0 ? (
        <button
          onClick={() => {
            onChange("");
            fetch();
          }}
          className=" absolute right-10 top-3"
        >
          <CroseIcon className={`w-4 h-4 color-app`} />
        </button>
      ) : null}

      <button
        onClick={() => {
          fetch(search);
        }}
        className={`${
          search.length > 0
            ? " btn rounded-md cursor-pointer "
            : " cursor-default "
        }w-6 h-6 absolute right-2 top-2`}
      >
        <SearchSVG
          classNames={`w-4 h-4 ml-1 ${
            search.length > 0 ? "custom-classes" : "text-gray-500"
          }`}
        />
      </button>
    </div>
  );
};

export default Searchbar;
