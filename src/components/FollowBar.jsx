import React, { useState, useEffect } from "react";
import useUserStore from "../stores/userStore";
import usePostStore from "../stores/postStore";
import { unfollowUserApi } from "../api/follow";
import { getFollowingApi } from "../api/search";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
const FollowBar = ({ followers, setCategoryOption }) => {
  const user = useUserStore((state) => state.user);
  const [updatedFollowers, setUpdatedFollowers] = useState(followers);
  const setSelectedUser = usePostStore((state) => state.setSelectedUser);
  const setActiveMenu = usePostStore((state) => state.setActiveMenu);
  const isRenderFollower = usePostStore((state) => state.isRenderFollower);
  const setIsRenderFollower = usePostStore(
    (state) => state.setIsRenderFollower
  );
  const setIsRenderProfileCard = usePostStore(
    (state) => state.setIsRenderProfileCard
  );
  const hdlDelteFollowing = async (e, id) => {
    e.stopPropagation();
    try {
      await unfollowUser(id); // รัน unfollow และหลังจาก unfollow แล้ว ให้ทำการอัปเดต followers ใหม่
      setUpdatedFollowers((prevFollowers) =>
        prevFollowers.filter((follower) => follower.id !== id)
      );
      setIsRenderProfileCard(true);
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
      <h4 className="text-xl font-bold flex items-center gap-2">
        <FaEye className="text-[35px] text-my-prim" />
        Following ({updatedFollowers.length})
      </h4>
      <ul className="max-h-56 p-4 overflow-y-auto">
        <AnimatePresence>
          {updatedFollowers.length === 0 ? (
            <p className="text-my-text text-opacity-50">
              Find other users to follow and see what's happening near them.
            </p>
          ) : (
            updatedFollowers.map((follower) => (
              <motion.div
                key={follower.id}
                className="flex items-center hover:bg-gray-50 p-2 rounded-lg cursor-pointer group"
                onClick={() => {
                  setSelectedUser(follower.id);
                  setActiveMenu("");
                  setCategoryOption("");
                }}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                <img
                  src={follower.imageUrl}
                  alt={follower.displayName}
                  className="w-[50px] h-[50px] rounded-full mr-3 object-cover"
                />
                <div>
                  <p className="font-medium">{follower.displayName}</p>
                </div>
                <div
                  className="ml-auto p-2 rounded-full flex items-center space-x-1 bg-my-secon hover:bg-my-secon-hover text-white transition-colors opacity-0 group-hover:opacity-100"
                  onClick={(e) => {
                    e.stopPropagation(); // Prevents triggering the parent click event
                    hdlDelteFollowing(e, follower.id);
                  }}
                >
                  <div className="flex gap-2 items-center">
                    <FaEyeSlash className="text-[20px]" />
                    Unfollow
                  </div>
                </div>
              </motion.div>
            ))
          )}
        </AnimatePresence>
      </ul>
    </div>
  );
};

export default FollowBar;
