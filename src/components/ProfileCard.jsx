import React, { useEffect, useState } from "react";
import usePostStore from "../stores/postStore";
import { getProfile } from "../api/userProfile";
import { MdOutlineReport } from "react-icons/md";
import { format } from "timeago.js";

const ProfileCard = ({ handleGetAllPostByUserId }) => {
  const bioUser = usePostStore((state) => state.bioUser);
  const setBioUser = usePostStore((state) => state.setBioUser);
  const selectedUser = usePostStore((state) => state.selectedUser);

  const getUserInfo = async () => {
    try {
      const resp = await getProfile(selectedUser);
      // console.log(resp.data.profileData);
      setBioUser(resp.data.profileData);
    } catch (err) {
      console.log(err?.response?.data?.error || err.message);
    }
  };
  const hdlReportUser = () => {
    document.getElementById("report-user-modal").showModal();
  };
  useEffect(() => {
    getUserInfo();
    // if (selectedUser) {
    //   handleGetAllPostByUserId(selectedUser);
    // }
  }, [selectedUser]);
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
              <p className="text-2xl pl-3 text-my-prim">
                {bioUser?.displayName}
              </p>
              <p className="self-end ml-5 text-my-text text-sm text-opacity-50 italic">
                ( joined us {format(bioUser?.createdAt)} )
              </p>
            </div>
            <textarea
              className="bg-my-bg-card w-full h-fit p-4 rounded-xl  self-start resize-none  text-[18px] italic text-my-text text-opacity-70"
              value={bioUser?.bio}
            />
          </div>
          {/* report button */}
          <button
            className="btn w-[50px] ml-[100px] h-[50px] text-my-text text-opacity-50 rounded-full text-3xl font-bold flex justify-center items-center bg-transparent border-none shadow-none hover:bg-opacity-10 relative self-start "
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
