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
    </div>
  );
};

export default Navbar;
