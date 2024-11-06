import React from 'react';

const FollowBar = ({ followers }) => {
  return (
    <div className="bg-white rounded-lg p-6 mb-6 w-full">
      <h4 className="text-xl font-bold mb-4">Following</h4>
      <ul className="space-y-4 max-h-36 overflow-y-auto">
        {followers.map((follower) => (
          <li key={follower.id} className="flex items-center hover:bg-gray-50 p-2 rounded-lg cursor-pointer">
            <img src={follower.avatar} alt={follower.name} className="w-10 h-10 rounded-full mr-3" />
            <div>
              <p className="font-medium">{follower.name}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FollowBar;
