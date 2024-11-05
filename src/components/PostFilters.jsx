import React from "react";

const PostFilters = ({
  sortOption,
  setSortOption,
  orderOption,
  setOrderOption,
}) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-6 w-full">
      <div className="flex flex-wrap gap-3 justify-center">
        <select
          className="px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={sortOption}
          onChange={(e) => setSortOption(e.target.value)}
        >
          <option disabled value="">
            Sort by
          </option>
          <option value="distance">Distance</option>
          <option value="createdAt">Date</option>
          <option value="upVote">Vote</option>
        </select>

        <select
          className="px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={orderOption}
          onChange={(e) => setOrderOption(e.target.value)}
        >
          {sortOption === "distance" && (
            <>
              <option value="desc">Farthest</option>
              <option value="asc">Nearest</option>
            </>
          )}
          {sortOption === "createdAt" && (
            <>
              <option value="desc">Newest</option>
              <option value="asc">Oldest</option>
            </>
          )}
          {sortOption === "upVote" && (
            <>
              <option value="desc">Most Popular</option>
              <option value="asc">Least Popular</option>
            </>
          )}
        </select>
      </div>
    </div>
  );
};

export default PostFilters;
