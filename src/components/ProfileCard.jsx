import React from 'react';
import UserProfile from './UserProfile';

const ProfileCard = ({ name, username }) => {

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-6 w-full">
      <div className="flex items-center">
        {/* PIC PROFILE */}
        <div className="w-16 h-16 rounded-full bg-gray-200 mr-4" onClick={() => document.getElementById('userProfile').showModal()}></div>


        <dialog id="userProfile" className="modal">
          <div className="modal-box w-full max-w-2xl h-1/2 overflow-y-auto">
            <UserProfile />
            <button onClick={() => document.getElementById('userProfile').close()} className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2" >✕</button>
          </div>
        </dialog>


        <div>
          <h3 className="text-xl font-bold">{name}</h3>
        </div>
      </div>  
        </div>
  );
};

export default ProfileCard;