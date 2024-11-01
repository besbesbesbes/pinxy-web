import React from 'react';

const FollowBar = ({ followers }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-6 w-full">
      <h4 className="text-xl font-bold mb-4">Following</h4>
      <ul className="space-y-4">
        {followers.map((follower) => (
          <li key={follower.id} className="flex items-center hover:bg-gray-50 p-2 rounded-lg cursor-pointer">
            <img src={follower.avatar} alt={follower.name} className="w-10 h-10 rounded-full mr-3" />
            <div>
              <p className="font-medium">{follower.name}</p>
              <p className="text-sm text-gray-600">@{follower.name.toLowerCase().replace(' ', '')}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FollowBar;