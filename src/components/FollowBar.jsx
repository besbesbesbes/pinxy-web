import React, { useState, useEffect } from "react";
import useUserStore from "../stores/userStore";
import usePostStore from "../stores/postStore";
import { unfollowUserApi } from "../api/follow";

const FollowBar = ({ followers, setCategoryOption }) => {
  const user = useUserStore((state) => state.user);
  const [updatedFollowers, setUpdatedFollowers] = useState(followers);
  const setSelectedUser = usePostStore((state) => state.setSelectedUser);
  const setActiveMenu = usePostStore((state) => state.setActiveMenu);

  const hdlDelteFollowing = async (e, id) => {
    e.stopPropagation();
    try {
      await unfollowUser(id); // รัน unfollow และหลังจาก unfollow แล้ว ให้ทำการอัปเดต followers ใหม่
      setUpdatedFollowers((prevFollowers) =>
        prevFollowers.filter((follower) => follower.id !== id)
      );
    } catch (err) {
      console.log(err.message);
    }
  };

  const unfollowUser = async (followingId) => {
    try {
      const result = await unfollowUserApi({ userId: user.id, followingId });
      console.log(result.data);
    } catch (err) {
      console.log(err.message);
    }
  };

  useEffect(() => {
    setUpdatedFollowers(followers);
  }, [followers]);

  return (
    <div className="bg-white rounded-lg p-5 mb-6 w-full">
      <h4 className="text-xl font-bold mb-4">Following</h4>
      <ul className="space-y-4 max-h-56 p-4 overflow-y-auto">
        {updatedFollowers.map((follower) => (
          <li
            key={follower.id}
            className="flex items-center hover:bg-gray-50 p-2 rounded-lg cursor-pointer"
            onClick={() => {
              setSelectedUser(follower.id),
                setActiveMenu(""),
                setCategoryOption("");
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
              className="ml-auto p-2 rounded-full flex items-center space-x-1 bg-my-secon hover:bg-my-secon-hover text-white transition-colors"
              onClick={(e) => hdlDelteFollowing(e, follower.id)}
            >
              <p>Unfollow</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FollowBar;
