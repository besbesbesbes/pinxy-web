import { useState, useEffect } from "react";
import { getUserApi } from "../api/search";
import { getProfile } from "../api/userProfile";
import usePostStore from "../stores/postStore";

export const SearchUser = ({ handleGetAllPostByUserId }) => {
  const [displayName, setDisplayName] = useState("");
  const [userList, setUserList] = useState([]);
  const [focused, setFocused] = useState(false);
  const selectedUser = usePostStore((state) => state.selectedUser);
  const setSelectedUser = usePostStore((state) => state.setSelectedUser);
  const bioUser = usePostStore((state) => state.bioUser);
  const setBioUser = usePostStore((state) => state.setBioUser);
  const setActiveMenu = usePostStore((state) => state.setActiveMenu);

  const hdlOnChange = (e) => {
    setDisplayName(e.target.value);
  };

  const getUser = async (name) => {
    try {
      const result = await getUserApi(name);
      setUserList(result.data.users || []); // Handle cases where result.users might be undefined
    } catch (err) {
      console.log(err.message);
    }
  };

  const getUserInfo = async () => {
    try {
      const resp = await getProfile(selectedUser);
      // console.log(resp.data.profileData);
      setBioUser(resp.data.profileData);
    } catch (err) {
      console.log(err?.response?.data?.error || err.message);
    }
  };

  useEffect(() => {
    if (displayName) {
      getUser(displayName);
    }
  }, [displayName]);

  useEffect(() => {
    getUserInfo();
    if (selectedUser) {
      handleGetAllPostByUserId(selectedUser);
    }
  }, [selectedUser]);

  return (
    <div className="bg-white rounded-lg p-6 mb-6 w-full relative">
      {/* <h4 className="text-xl font-bold mb-4">Search User</h4> */}
      <input
        type="text"
        className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
        placeholder="Search User"
        value={displayName}
        onChange={hdlOnChange}
        onFocus={() => setFocused(true)}
        onBlur={() => setTimeout(() => setFocused(false), 100)} // Delay closing dropdown
      />

      {/* Dropdown for showing user list */}
      {focused && userList.length > 0 && (
        <ul className="absolute top-full left-0 w-full bg-white border border-gray-300 rounded-lg mt-2 max-h-60 overflow-y-auto shadow-lg z-10">
          {userList.slice(0, 5).map((user, index) => (
            <li
              key={index}
              className="px-4 py-2 hover:bg-blue-100 cursor-pointer"
              onClick={() => {
                setSelectedUser(user.id), setActiveMenu("");
              }}
            >
              {user.displayName} {/* Adjust property as needed */}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
