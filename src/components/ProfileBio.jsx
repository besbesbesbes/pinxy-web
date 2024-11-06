import React from "react";
import { Mail, Users, Edit } from "lucide-react";

const ProfileBio = ({
  displayName = "John Doe",
  username = "johndoe",
  email = "john@example.com",
  bio = "Frontend Developer | React Enthusiast",
  followers = 1234,
}) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-6 w-full">
      <div className="flex flex-col md:flex-row gap-6">
        {/* Profile Image */}
        <div className="flex-shrink-0">
          <div className="w-24 h-24 rounded-full bg-gray-200"></div>
        </div>

        {/* Profile Info */}
        <div className="flex-grow space-y-4">
          {/* Header with Buttons */}
          <div className="flex justify-between items-start">
            <div>
              <h2 className="text-2xl font-bold">{displayName}</h2>
              <p className="text-gray-600">{username}</p>
            </div>
            <div className="flex gap-2">
              <button className="flex items-center gap-2 px-4 py-2 text-sm text-gray-800 bg-gray-100 border border-gray-300 rounded-lg hover:bg-gray-200">
                <Users className="w-4 h-4" />
                {followers.toLocaleString()} Followers
              </button>
              <button className="flex items-center gap-2 px-4 py-2 text-sm text-gray-800 bg-transparent border border-gray-300 rounded-lg hover:bg-gray-100">
                <Edit className="w-4 h-4" />
                Edit Profile
              </button>
            </div>
          </div>

          {/* Email */}
          <div className="flex items-center gap-2 text-gray-600">
            <Mail className="w-4 h-4" />
            <span>{email}</span>
          </div>

          {/* Bio */}
          <p className="text-gray-700">{bio}</p>
        </div>
      </div>
    </div>
  );
};

export default ProfileBio;
