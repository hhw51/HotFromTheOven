import React from 'react';

const SearchBar: React.FC = () => {
  return (
    <div className="relative">
      <input
        type="text"
        placeholder="Search..."
        className="border rounded-full px-4 py-2 focus:outline-none"
      />
      <button
        className="absolute right-2 top-1/2 transform -translate-y-1/2 text-orange-500"
        aria-label="Search"
      >
        🔍
      </button>
    </div>
  );
};

export default SearchBar;
