import React from "react";

const PostSkeleton = () => {
  return (
    <div className="w-full min-h-[100px] bg-gray-200 animate-blink flex flex-col py-5 px-10 rounded-xl shadow-md">
      <div className="flex gap-5">
        <div className="w-[80px] h-[80px] bg-gray-300 rounded-full"></div>
        <div className="flex-1 space-y-3">
          <div className="h-4 bg-gray-300 rounded w-1/3"></div>
          <div className="h-4 bg-gray-300 rounded w-1/2"></div>
        </div>
      </div>
      <div className="mt-5 h-4 bg-gray-300 rounded w-full"></div>
      <div className="mt-5 h-40 bg-gray-300 rounded w-full"></div>
      <div className="mt-5 flex justify-between">
        <div className="h-4 bg-gray-300 rounded w-1/4"></div>
        <div className="h-4 bg-gray-300 rounded w-1/4"></div>
      </div>
    </div>
  );
};

export default PostSkeleton;
