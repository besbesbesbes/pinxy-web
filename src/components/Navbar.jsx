import React from 'react';
import { Menu, Search } from 'lucide-react';

const Navbar = () => {
  return (
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
    </div>
  );
};

export default Navbar;