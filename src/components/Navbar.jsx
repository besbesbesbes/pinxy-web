import React from 'react';

const Navbar = () => {
  return (
    <div className="bg-white rounded-lg shadow-md p-4 w-full"> {/* ใช้ w-full */}
      <h1 className="text-4xl font-bold text-gray-900 mb-2">Pinxy</h1> {/* เพิ่ม mb-2 เพื่อเพิ่มระยะห่างด้านล่าง */}
      <input 
        type="text" 
        className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500" 
        placeholder="Search" 
      />
    </div>
  );
};

export default Navbar;

