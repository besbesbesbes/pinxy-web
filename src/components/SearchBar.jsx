import React from 'react';

const SearchBar = () => {
  return (
    <div className="bg-white rounded-lg shadow-md p-4 w-full max-w-xl">
      <input 
        type="text" 
        className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500" 
        placeholder="Search" 
      />
      <button className="w-full md:w-auto bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg mt-2">
        Search
      </button>
    </div>
  );
};

export default SearchBar;