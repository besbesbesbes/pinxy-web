import React, { useEffect, useState } from "react";
import usePostStore from "../stores/postStore";
import { getProfile } from "../api/userProfile";
import { MdOutlineReport } from "react-icons/md";
import { format } from "timeago.js";
import { FaEye } from "react-icons/fa";
import { followUserApi, getFollowingInfoApi } from "../api/follow";
import useUserStore from "../stores/userStore";

const ProfileCard = ({ handleGetAllPostByUserId }) => {
  const bioUser = usePostStore((state) => state.bioUser);
  const setBioUser = usePostStore((state) => state.setBioUser);
  const selectedUser = usePostStore((state) => state.selectedUser);
  const user = useUserStore((state) => state.user);
  const [isFollow, setIsFollow] = useState(false);
  const setIsRenderFollower = usePostStore(
    (state) => state.setIsRenderFollower
  );
  const isRenderProfileCard = usePostStore(
    (state) => state.isRenderProfileCard
  );
  const setIsRenderProfileCard = usePostStore(
    (state) => state.setIsRenderProfileCard
  );
  const getUserInfo = async () => {
    try {
      if (selectedUser) {
        const resp = await getProfile(selectedUser);
        console.log("selectedUser", selectedUser);
        console.log(resp.data.profileData);
        setBioUser(resp.data.profileData);
      }
    } catch (err) {
      console.log(err?.response?.data?.error || err.message);
    }
  };
  const hdlReportUser = () => {
    document.getElementById("report-user-modal").showModal();
  };
  const hdlFollowing = async () => {
    try {
      setIsRenderFollower(true);
      // console.log("hdlfollowing");
      // console.log(user.id, selectedUser);
      const body = {
        userId: user.id,
        followingId: selectedUser,
      };
      const resp = await followUserApi(body);
      getFollowingInfo();
      // console.log(resp);
    } catch (err) {
      console.log(err.response.data.error || err.message);
    } finally {
      setIsRenderFollower(false);
    }
  };
  const getFollowingInfo = async () => {
    try {
      setIsRenderFollower(true);
      const body = {
        userId: user.id,
        followingId: selectedUser,
      };
      const resp = await getFollowingInfoApi(body);
      setIsFollow(resp.data.isFollow);
    } catch (err) {
      console.log(err.response.data.error || err.message);
    } finally {
      setIsRenderFollower(false);
    }
  };

  useEffect(() => {
    getUserInfo();
    getFollowingInfo();
    setIsRenderProfileCard(false);
    // if (selectedUser) {
    //   handleGetAllPostByUserId(selectedUser);
    // }
  }, [selectedUser, isRenderProfileCard]);
  return selectedUser ? (
    <div className="w-full min-h-[120px]  flex flex-col pl-10 rounded-xl gap-5 pt-5 cursor-pointer text-my-text">
      <div className="flex items-end gap-4">
        <img
          className="w-[120px] h-[120px] object-cover rounded-full shadow-md"
          src={bioUser?.imageUrl}
          alt="no load"
        />
        <div className="flex flex-1 ">
          <div className=" flex flex-col gap-2 flex-1">
            <div className="flex">
              <p className="text-2xl pl-3 text-my-prim dark:text-my-text-dark">
                {bioUser?.displayName}
              </p>
              {/* follow area */}
              {user.id == selectedUser ? null : !isFollow ? (
                <div
                  className="flex px-2 py-1 gap-2 items-center cursor-pointer rounded-full bg-my-secon ml-2 text-white hover:bg-my-secon-hover"
                  onClick={hdlFollowing}
                >
                  <FaEye className="text-[20px]" />
                  <p>Follow</p>
                </div>
              ) : null}
              <p className="self-end ml-5 text-my-text dark:text-my-text-dark text-sm text-opacity-50 italic">
                ( joined us {format(bioUser?.createdAt)} )
              </p>
            </div>
            <textarea
              className="bg-my-bg-card dark:bg-my-bg-card-dark w-full h-fit p-4 rounded-xl  self-start resize-none  text-[18px] italic text-my-text dark:text-my-text-dark text-opacity-70"
              value={bioUser?.bio}
            />
          </div>
          {/* report button */}
          <button
            className="btn w-[50px] ml-[100px] h-[50px] text-my-text dark:text-my-text-dark text-opacity-50 rounded-full text-3xl font-bold flex justify-center items-center bg-transparent border-none shadow-none hover:bg-opacity-10 relative self-start "
            onClick={hdlReportUser}
          >
            <MdOutlineReport className="absolute text-[35px]" />
          </button>
        </div>
      </div>
    </div>
  ) : null;
};

export default ProfileCard;
