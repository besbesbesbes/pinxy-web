import React from 'react';

export const SearchUser = () => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-6 w-full">
      <h4 className="text-xl font-bold mb-4">Search User</h4>
      <input 
        type="text" 
        className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500" 
        placeholder="Search User" 
      />
    </div>
  );
};

export const DistanceFilter = ({ distance, setDistance }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-6 w-full">
      <h4 className="text-xl font-bold mb-4">Filter by Distance</h4>
      <input
        type="range"
        min="500"
        max="2000"
        value={distance}
        onChange={(e) => setDistance(e.target.value)}
        className="w-full"
      />
      <p className="text-gray-600 text-center mt-2">{distance} km</p>
    </div>
  );
};