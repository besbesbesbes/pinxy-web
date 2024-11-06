import React, { useEffect } from "react";
import UserProfile from "./UserProfile";

const ProfileCard = (props) => {
  const { profileData: data, getProfileData } = props;
  const { profileData } = data;

  return (
    <div className="bg-white rounded-xl shadow-md p-6 mb-6 w-full">
      <button onClick={() => console.log(data)}>data</button>
      <div className="flex items-center">
        {/* PIC PROFILE */}
        <div
          className="w-16 h-16 rounded-full bg-gray-200 mr-4"
          onClick={() => document.getElementById("userProfile").showModal()}
        ></div>

        <dialog id="userProfile" className="modal">
          <div className="modal-box w-full max-w-3xl h-1/2 overflow-y-auto">
            {profileData && <UserProfile profileData={profileData} />}
            <button
              onClick={() => document.getElementById("userProfile").close()}
              className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
            >
              ✕
            </button>
          </div>
        </dialog>

        <div>
          <h3 className="text-xl font-bold">{profileData?.displayName}</h3>
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;
