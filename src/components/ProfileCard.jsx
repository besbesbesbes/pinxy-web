import React from 'react';

const ProfileCard = ({ name, username }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-6 w-full">
      <div className="flex items-center">
        <div className="w-16 h-16 rounded-full bg-gray-200 mr-4"></div>
        <div>
          <h3 className="text-xl font-bold">{name}</h3>
          <p className="text-gray-600">@{username}</p>
        </div>
      </div>
      <div className="flex justify-between mt-6">
        <div className="text-center">
          <p className="font-bold">Posts</p>
          <p className="text-gray-600">24</p>
        </div>
        <div className="text-center">
          <p className="font-bold">Following</p>
          <p className="text-gray-600">145</p>
        </div>
        <div className="text-center">
          <p className="font-bold">Followers</p>
          <p className="text-gray-600">298</p>
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;