import React from 'react';

const ProfileCard = ({ name, username }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-6 w-full">
      <div className="flex items-center">
        <div className="w-16 h-16 rounded-full bg-gray-200 mr-4"></div>
        <div>
          <h3 className="text-xl font-bold">{name}</h3>
        </div>
      </div>  
        </div>
  );
};

export default ProfileCard;