import { useState, useEffect } from "react";
import { getUserApi } from "../api/search";

export const SearchUser = () => {
  const [displayName, setDisplayName] = useState("");
  const [userList, setUserList] = useState([]);
  const [focused, setFocused] = useState(false);

  const hdlOnChange = (e) => {
    setDisplayName(e.target.value);
  };

  const getUser = async (name) => {
    try {
      const result = await getUserApi(name);
      console.log(result.data.users);
      setUserList(result.data.users || []); // Handle cases where result.users might be undefined
    } catch (err) {
      console.log(err.message);
    }
  };

  useEffect(() => {
    if (displayName) {
      getUser(displayName);
    }
  }, [displayName]);

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-6 w-full relative">
      <h4 className="text-xl font-bold mb-4">Search User</h4>
      <input
        type="text"
        className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
        placeholder="Search User"
        value={displayName}
        onChange={hdlOnChange}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
      />
      
      {/* Dropdown for showing user list */}
      {focused && userList.length > 0 && (
        <ul className="absolute top-full left-0 w-full bg-white border border-gray-300 rounded-lg mt-2 max-h-60 overflow-y-auto shadow-lg z-10">
          {userList.slice(0, 5).map((user, index) => (
            <li
              key={index}
              className="px-4 py-2 hover:bg-blue-100 cursor-pointer"
            >
              {user.displayName} {/* Adjust property as needed */}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
