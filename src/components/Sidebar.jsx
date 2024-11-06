import React, { useState } from 'react';
import { 
  Home,
  Calendar,
  ShoppingBag,
  Briefcase,
  Settings,
  LogOut,
  User,
  ShieldAlert,
  Earth
} from 'lucide-react';

const MenuItem = ({ icon: Icon, label, isActive, onClick }) => (
  <li>
    <button 
      onClick={onClick}
      className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors
        ${isActive 
          ? 'bg-blue-500 text-white' 
          : 'text-gray-700 hover:bg-gray-100'
        }`}
    >
      <Icon className="h-5 w-5" />
      <span className="font-medium">{label}</span>
    </button>
  </li>
);

const Sidebar = () => {
  const [activeMenu, setActiveMenu] = useState("Home");

  return (
    <div className="bg-white fixed top-0 left-0 w-64 h-screen flex flex-col shadow-md border-r">
      {/* Profile Section */}
      <div className="p-6 border-b">
        <div className="flex items-center space-x-4">
          <div className="w-12 h-12 rounded-full bg-blue-500 flex items-center justify-center">
            <User className="h-6 w-6 text-white" />
          </div>
          <div>
            <h3 className="font-bold text-gray-900">Jane Smith</h3>
            <p className="text-sm text-gray-600">Administrator</p>
          </div>
        </div>
      </div>

      {/* Menu Items */}
      <nav className="flex-1 overflow-y-auto p-4">
        <ul className="space-y-2">
          <MenuItem 
            icon={Home} 
            label="Home" 
            isActive={activeMenu === "Home"} 
            onClick={() => setActiveMenu("Home")} 
          />
          <MenuItem 
            icon={ShieldAlert} 
            label="Alert" 
            isActive={activeMenu === "Alert"} 
            onClick={() => setActiveMenu("Alert")} 
          />
          <MenuItem 
            icon={Calendar} 
            label="Events" 
            isActive={activeMenu === "Events"} 
            onClick={() => setActiveMenu("Events")} 
          />
          <MenuItem 
            icon={ShoppingBag} 
            label="Shop" 
            isActive={activeMenu === "Shop"} 
            onClick={() => setActiveMenu("Shop")} 
          />
          <MenuItem 
            icon={Briefcase} 
            label="Jobs" 
            isActive={activeMenu === "Jobs"} 
            onClick={() => setActiveMenu("Jobs")} 
          />
          <MenuItem 
            icon={Earth} 
            label="Other" 
            isActive={activeMenu === "Other"} 
            onClick={() => setActiveMenu("Other")} 
          />
        </ul>
      </nav>

      {/* Bottom Actions */}
      <div className="p-4 border-t">
        <ul className="space-y-2">
          <MenuItem 
            icon={Settings} 
            label="Settings" 
            isActive={activeMenu === "Settings"} 
            onClick={() => setActiveMenu("Settings")} 
          />
          <li>
            <button className="w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-red-600 hover:bg-red-50 transition-colors">
              <LogOut className="h-5 w-5" />
              <span className="font-medium">Logout</span>
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
