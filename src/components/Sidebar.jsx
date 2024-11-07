import React, { useEffect, useState } from "react";
import {
  Home,
  Calendar,
  ShoppingBag,
  Briefcase,
  Settings,
  LogOut,
  User,
  ShieldAlert,
  Earth,
} from "lucide-react";
import { BsChatLeftDotsFill } from "react-icons/bs";
import { MdOutlineWork } from "react-icons/md";
import { RiShoppingBasketFill } from "react-icons/ri";
import { IoNewspaper } from "react-icons/io5";
import { IoIosAlert } from "react-icons/io";
import { RiHome7Fill } from "react-icons/ri";
import { AiFillOpenAI } from "react-icons/ai";
import usePostStore from "../stores/postStore";
import useUserStore from "../stores/userStore";

const MenuItem = ({ icon: Icon, label, isActive, onClick }) => (
  <li>
    <button
      onClick={onClick} // กำหนด onClick เพื่อเรียกใช้ฟังก์ชันเมื่อคลิก
      className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors
        ${
          isActive
            ? "bg-my-prim text-white"
            : "text-my-prim text-opacity-60 hover:bg-gray-100"
        }`}
    >
      <Icon className="h-7 w-7" />
      <span className="font-medium">{label}</span>
    </button>
  </li>
);

const Sidebar = ({ setCategoryOption, inputRef, setValue }) => {
  const postForAI = usePostStore((state) => state.postForAI);
  const user = useUserStore((state) => state.user);
  const activeMenu = usePostStore((state) => state.activeMenu);
  const setActiveMenu = usePostStore((state) => state.setActiveMenu);
  const setAiSummaryTrigger = usePostStore(
    (state) => state.setAiSummaryTrigger
  );
  const setSelectedUser = usePostStore((state) => state.setSelectedUser);
  const hdlAISummary = () => {
    if (postForAI.length > 0) {
      setAiSummaryTrigger(true);
      document.getElementById("ai-summary-modal").showModal();
    }
  };
  const hdlClickCategory = (label, category) => {
    setActiveMenu(label);
    setCategoryOption(category);
    inputRef.current.value = "";
    setValue("");
    setSelectedUser(null);
  };

  return (
    <div className="bg-my-bg-card fixed top-0 left-0 w-64 h-screen flex flex-col shadow-lg text-xl">
      {/* Profile Section */}
      <div className="p-6 border-b">
        <div className="flex items-center space-x-4">
          <div className="w-12 h-12 rounded-full bg-my-prim flex items-center justify-center">
            <User className="h-6 w-6 text-white" />
          </div>
          <div>
            <h3 className="font-bold text-gray-900">Jane Smith</h3>
            <p className="text-sm text-gray-600">Administrator</p>
          </div>
        </div>
      </div>

      {/* Menu Items */}
      <div className="flex-1">
        <nav className="flex-1 overflow-y-auto p-4">
          <ul className="space-y-2">
            <MenuItem
              icon={RiHome7Fill}
              label="Home"
              isActive={activeMenu === "Home"}
              onClick={() => hdlClickCategory("Home", "")}
            />
            <MenuItem
              icon={IoIosAlert}
              label="Alert"
              isActive={activeMenu === "Alert"}
              onClick={() => hdlClickCategory("Alert", "ALERT")}
            />
            <MenuItem
              icon={IoNewspaper}
              label="News"
              isActive={activeMenu === "News"}
              onClick={() => hdlClickCategory("News", "NEWS")}
            />
            <MenuItem
              icon={RiShoppingBasketFill}
              label="Shop"
              isActive={activeMenu === "Shop"}
              onClick={() => hdlClickCategory("Shop", "SHOP")}
            />
            <MenuItem
              icon={MdOutlineWork}
              label="Jobs"
              isActive={activeMenu === "Jobs"}
              onClick={() => hdlClickCategory("Jobs", "JOB")}
            />
            <MenuItem
              icon={BsChatLeftDotsFill}
              label="Other"
              isActive={activeMenu === "Other"}
              onClick={() => hdlClickCategory("Other", "OTHER")}
            />
          </ul>
        </nav>
        {/* ai button */}
        <div className="flex overflow-y-auto p-4 text-my-secon hover:text-my-secon-hover cursor-pointer">
          <button
            className="w-full flex items-center space-x-3 px-4 py-3 rounded-xl border-my-secon transition-colors border transform hover:scale-105 duration-150"
            onClick={hdlAISummary}
          >
            <AiFillOpenAI className="h-7 w-7" />
            <span className="font-medium">Summary</span>
          </button>
        </div>
      </div>

      {/* Bottom Actions */}
      <div className="p-4 border-t">
        <ul className="space-y-2">
          {/* <MenuItem
            icon={Settings}
            label="Settings"
            isActive={activeMenu === "Settings"}
            onClick={() => setActiveMenu("Settings")}
          /> */}
          <li>
            <button className="w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-my-acct hover:bg-red-50 transition-colors">
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
