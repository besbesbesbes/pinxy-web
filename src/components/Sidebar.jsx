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
import { useNavigate } from "react-router-dom";
import UserProfile from "./UserProfile";

const MenuItem = ({ icon: Icon, label, isActive, onClick }) => (
  <li>
    <button
      onClick={onClick} // กำหนด onClick เพื่อเรียกใช้ฟังก์ชันเมื่อคลิก
      className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors
        ${isActive
          ? "bg-my-prim text-white"
          : "text-my-prim text-opacity-60 hover:bg-gray-100"
        }`}
    >
      <Icon className="h-7 w-7" />
      <span className="font-medium">{label}</span>
    </button>
  </li>
);



const Sidebar = ({ setCategoryOption, profileData }) => {
  const [activeMenu, setActiveMenu] = useState("Home"); // กำหนดค่าเริ่มต้น
  const setAiSummaryTrigger = usePostStore(
    (state) => state.setAiSummaryTrigger
  );
  const logout = useUserStore((state) => state.logout)
  const navigate = useNavigate()

  const hdlLogout = () => {
    console.log("logout")
    logout()
    navigate("/")

  }
  const hdlAISummary = () => {
    setAiSummaryTrigger(true);
    document.getElementById("ai-summary-modal").showModal();
  };

  return (
    <div className="bg-my-bg-card fixed top-0 left-0 w-64 h-screen flex flex-col shadow-lg text-xl">
      {/* Profile Section */}
      <div className="p-6 border-b">
        <div className="flex items-center space-x-4">
          <div className="w-12 h-12 rounded-full overflow-hidden   flex items-center justify-center">
            <img src={profileData.imageUrl} alt="profilePic" className="w-[45px] h-[45px] object-cover rounded-full" onClick={() => document.getElementById('userProfile').showModal()} />
          </div>
          <div>
            <h3 className="font-bold text-gray-900">{profileData.displayName}</h3>
            <p className="text-sm text-gray-600">{profileData.name}</p>
          </div>
        </div>
      </div>
      <dialog id="userProfile" className="modal">
        <div className="modal-box flex flex-col h-1/2 max-w-2xl ">
          <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2 " onClick={() => document.getElementById('userProfile').close()}>✕</button>
          <UserProfile profileData={profileData} />
        </div>
      </dialog>
      {/* Menu Items */}
      <div className="flex-1">
        <nav className="flex-1 overflow-y-auto p-4">
          <ul className="space-y-2">
            <MenuItem
              icon={RiHome7Fill}
              label="Home"
              isActive={activeMenu === "Home"}
              onClick={() => {
                setActiveMenu("Home"), setCategoryOption("");
              }}
            />
            <MenuItem
              icon={IoIosAlert}
              label="Alert"
              isActive={activeMenu === "Alert"}
              onClick={() => {
                setActiveMenu("Alert"), setCategoryOption("ALERT");
              }}
            />
            <MenuItem
              icon={IoNewspaper}
              label="News"
              isActive={activeMenu === "News"}
              onClick={() => {
                setActiveMenu("News"), setCategoryOption("NEWS");
              }}
            />
            <MenuItem
              icon={RiShoppingBasketFill}
              label="Shop"
              isActive={activeMenu === "Shop"}
              onClick={() => {
                setActiveMenu("Shop"), setCategoryOption("SHOP");
              }}
            />
            <MenuItem
              icon={MdOutlineWork}
              label="Jobs"
              isActive={activeMenu === "Jobs"}
              onClick={() => {
                setActiveMenu("Jobs"), setCategoryOption("JOB");
              }}
            />
            <MenuItem
              icon={BsChatLeftDotsFill}
              label="Other"
              isActive={activeMenu === "Other"}
              onClick={() => {
                setActiveMenu("Other"), setCategoryOption("OTHER");
              }}
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
          <MenuItem
            icon={Settings}
            label="Settings"
            isActive={activeMenu === "Settings"}
            onClick={() => setActiveMenu("Settings")}
          />
          <li>
            <button className="w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-my-acct hover:bg-red-50 transition-colors">
              <LogOut className="h-5 w-5" />
              <span className="font-medium" onClick={hdlLogout}>Logout</span>
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
