import React from "react";
import usePostStore from "../stores/postStore";
import { FaDeleteLeft } from "react-icons/fa6";

const FollowBar = ({ followers }) => {
  const setSelectedUser = usePostStore((state) => state.setSelectedUser);
  const setActiveMenu = usePostStore((state) => state.setActiveMenu);
  const hdlDelteFollowing = (e, id) => {
    e.stopPropagation();
    console.log(id);
  };
  return (
    <div className="bg-white rounded-lg p-6 mb-6 w-full">
      <h4 className="text-xl font-bold mb-4">Following</h4>
      <ul className="space-y-4 max-h-36 overflow-y-auto">
        {followers.map((follower) => (
          <li
            key={follower.id}
            className="flex items-center hover:bg-gray-50 p-2 rounded-lg cursor-pointer"
            onClick={() => {
              setSelectedUser(follower.id), setActiveMenu("");
            }}
          >
            <img
              src={follower.imageUrl}
              alt={follower.displayName}
              className="w-10 h-10 rounded-full mr-3"
            />
            <div>
              <p className="font-medium">{follower.displayName}</p>
            </div>
            <div
              className="ml-auto bg-red-200 p-2 rounded-full flex items-center space-x-1"
              onClick={(e) => hdlDelteFollowing(e, follower.id)}
            >
              <p>Unfollow</p>
              <FaDeleteLeft />
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FollowBar;
