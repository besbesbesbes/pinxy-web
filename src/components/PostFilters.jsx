import React from "react";

const PostFilters = ({
  sortOption,
  setSortOption,
  orderOption,
  setOrderOption,
}) => {
  return (
    <div className="flex items-center justify-between w-full p-3">
      <div className="flex items-center gap-2 ml-auto">
        <p className="text-lg dark:text-my-text-dark">Sort By:</p>
        <select
          className="px-4 py-2 rounded-lg focus:outline-none shadow-md dark:bg-my-bg-card-dark dark:text-my-text-dark"
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
          className="px-4 py-2 rounded-lg focus:outline-none shadow-md dark:bg-my-bg-card-dark dark:text-my-text-dark"
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
