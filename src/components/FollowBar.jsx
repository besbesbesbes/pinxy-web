import React from "react";
import usePostStore from "../stores/postStore";

const FollowBar = ({ followers }) => {
  const setSelectedUser = usePostStore((state) => state.setSelectedUser);

  return (
    <div className="bg-white rounded-lg p-5 mb-6 w-full">
      <h4 className="text-xl font-bold mb-4">Following</h4>
      <ul className="space-y-4 max-h-56 p-4 overflow-y-auto">
        {followers.map((follower) => (
          <li
            key={follower.id}
            className="flex items-center hover:bg-gray-50 p-2 rounded-lg cursor-pointer"
            onClick={() => setSelectedUser(follower.id)}
          >
            <img
              src={follower.imageUrl}
              alt={follower.displayName}
              className="w-10 h-10 rounded-full mr-3"
            />
            <div>
              <p className="font-medium">{follower.displayName}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FollowBar;
