<<<<<<< HEAD
import React from 'react';
import { Menu, Search } from 'lucide-react';
=======
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
>>>>>>> dev

  return (
<<<<<<< HEAD
    <div className="fixed top-0 right-0 bg-white shadow-md h-16 ml-64 w-[calc(100%-16rem)]">
      <div className="flex items-center h-full px-6">
        <div className="flex items-center flex-1">
          <div className="relative flex-1 max-w-2xl">
            <input 
              type="text" 
              className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500" 
              placeholder="Search" 
            />
            <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
          </div>
        </div>
      </div>
=======
    <div className="bg-white rounded-lg shadow-md p-4 w-full">
      {" "}
      {/* ใช้ w-full */}
      <h1 className="text-4xl font-bold text-gray-900 mb-2">Pinxy</h1>{" "}
      {/* เพิ่ม mb-2 เพื่อเพิ่มระยะห่างด้านล่าง */}
      <form className="relative" onSubmit={handleSubmit}>
        {" "}
        {/* ห่อหุ้ม input ด้วย form */}
        <input
          type="text"
          ref={inputRef}
          className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 pr-10"
          placeholder="Search"
        />
        <button type="submit" className="absolute right-2 top-2 text-gray-500">
          <FaSearch className="h-5 w-5" /> {/* ใช้ไอคอนค้นหาจาก react-icons */}
        </button>
      </form>
>>>>>>> dev
    </div>
  );
};

<<<<<<< HEAD
export default Navbar;
=======
export default Navbar;
>>>>>>> dev
