import React, { useRef } from "react";
import { FaSearch } from "react-icons/fa"; // นำเข้าไอคอนค้นหาจาก react-icons

const Navbar = ({ setCategoryOption, handleGetAllPostByValue }) => {
  const inputRef = useRef(); // ใช้ useRef สำหรับเก็บค่า input

  const handleSubmit = (e) => {
    e.preventDefault();
    setCategoryOption("");
    handleGetAllPostByValue(inputRef.current.value); // ส่งค่า input ที่พิมพ์ให้ฟังก์ชัน
    // inputRef.current.value = ""; // ล้างค่า input หลังจากค้นหา
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-4 w-full">
      {" "}
      {/* ใช้ w-full */}
      <div className="flex justify-start">
        <div className="flex px-2 gap-2 items-baseline">
          <img src="/src/assets/Pinxy.png" alt="LOGO" className="w-[30px]" />
          <h1 className="text-[40px] font-bold mb-2 text-my-prim">
            <span className="text-my-acct">Pin</span>xy
          </h1>{" "}
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
            placeholder="Search..."
          />
          <button
            type="submit"
            className="flex bg-my-prim justify-center items-center gap-1 px-3 py-2 rounded-lg"
          >
            <FaSearch className="h-5 w-5 text-white" />
            <p className="font-bold text-white">Search</p>
          </button>
        </div>
      </form>
    </div>
  );
};

export default Navbar;
