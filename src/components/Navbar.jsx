import React, { useState, useEffect } from "react";
import { FaSearch } from "react-icons/fa"; // นำเข้าไอคอนค้นหาจาก react-icons
import usePostStore from "../stores/postStore";
import { getUserApi } from "../api/search";
import { getProfile } from "../api/userProfile";

const Navbar = ({
  inputRef,
  setValue,
  setCategoryOption,
  handleGetAllPostByValue,
  handleGetAllPostByUserId,
}) => {
  const [displayName, setDisplayName] = useState("");
  const [userList, setUserList] = useState([]);
  const [focused, setFocused] = useState(false);
  const selectedUser = usePostStore((state) => state.selectedUser);
  const setSelectedUser = usePostStore((state) => state.setSelectedUser);
  const setActiveMenu = usePostStore((state) => state.setActiveMenu);
  const setBioUser = usePostStore((state) => state.setBioUser);

  const handleSubmit = (e) => {
    e.preventDefault();
    setCategoryOption("");
    handleGetAllPostByValue(inputRef.current.value); // ส่งค่า input ที่พิมพ์ให้ฟังก์ชัน
    setValue(inputRef.current.value);
    setActiveMenu("");
    setSelectedUser(null);
  };

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
    <div className="bg-white rounded-lg shadow-md p-4 w-full">
      {" "}
      {/* ใช้ w-full */}
      <div className="flex justify-start">
        <div className="flex px-2 items-baseline">
          <img
            src="/src/assets/Pinxy.png"
            alt="LOGO"
            className="w-[30px] translate-y-1"
          />
          <h1 className="text-[40px] font-bold mb-2 text-my-acct">
            <span className="text-my-prim">in</span>xy
          </h1>
        </div>
        <div className="self-end text-lg italic text-my-text font-bold text-opacity-40 mb-[15px]">
          Discover What's Happening Near You.
        </div>
      </div>
      {/* เพิ่ม mb-2 เพื่อเพิ่มระยะห่างด้านล่าง */}
      <form className="relative w-full" onSubmit={handleSubmit}>
        <div className="w-full px-1 py-1 rounded-lg border border-gray-300 flex">
          <input
            type="text"
            ref={inputRef}
            className="w-full flex-1 focus:outline-none text-xl text-my-text text-opacity-70 pl-2"
            placeholder="Search Posts or Users..."
            value={displayName}
            onChange={hdlOnChange}
            onFocus={() => setFocused(true)}
            onBlur={() => setTimeout(() => setFocused(false), 100)} // Delay closing dropdown
          />
          <button
            type="submit"
            className="flex bg-my-prim justify-center items-center gap-1 px-3 py-2 rounded-lg"
          >
            <FaSearch className="h-5 w-5 text-white" />
            <p className="font-bold text-white">Search</p>
          </button>
        </div>
        {/* Dropdown for showing user list */}
        {focused && userList.length > 0 && (
          <ul className="absolute top-full left-0 w-full bg-white border border-gray-300 rounded-lg mt-2 max-h-60 overflow-y-auto shadow-lg z-10">
            {userList.slice(0, 5).map((user, index) => (
              <li
                key={index}
                className="flex items-center px-4 py-2 hover:bg-blue-100 cursor-pointer"
                onClick={() => {
                  setSelectedUser(user.id), setActiveMenu("");
                }}
              >
                <img
                  src={user.imageUrl}
                  alt={user.displayName}
                  className="w-8 h-8 rounded-full mr-3"
                />
                <span>{user.displayName}</span>
              </li>
            ))}
          </ul>
        )}
      </form>
    </div>
  );
};

export default Navbar;
