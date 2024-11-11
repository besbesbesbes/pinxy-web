import React from "react";
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
import { IoIosPaper } from "react-icons/io";
import { IoIosAlert } from "react-icons/io";
import { RiHome7Fill } from "react-icons/ri";
import { AiFillOpenAI } from "react-icons/ai";
import usePostStore from "../stores/postStore";
import useUserStore from "../stores/userStore";
import { useNavigate } from "react-router-dom";
import UserProfile from "./UserProfile";
import { FaQuestionCircle } from "react-icons/fa";
import { MdSummarize } from "react-icons/md";

const MenuItem = ({ icon: Icon, label, isActive, onClick }) => (
  <li>
    <button
      onClick={onClick}
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

const Sidebar = ({ setCategoryOption, inputRef, setValue, profileData }) => {
  const postForAI = usePostStore((state) => state.postForAI);
  const user = useUserStore((state) => state.user);
  const activeMenu = usePostStore((state) => state.activeMenu);
  const setActiveMenu = usePostStore((state) => state.setActiveMenu);
  const setAiSummaryTrigger = usePostStore(
    (state) => state.setAiSummaryTrigger
  );
  const setAiAskmeTrigger = usePostStore((state) => state.setAiAskmeTrigger);
  const setSelectedUser = usePostStore((state) => state.setSelectedUser);

  const logout = useUserStore((state) => state.logout)
  const navigate = useNavigate()

  const hdlLogout = () => {
    console.log("logout")
    logout()
    navigate("/")
  }
  const hdlAISummary = () => {
    if (postForAI.length > 0) {
      setAiSummaryTrigger(true);
      document.getElementById("ai-summary-modal").showModal();
    }
  };

  const hdlAIAskme = () => {
    if (postForAI.length > 0) {
      setAiAskmeTrigger(true);
      document.getElementById("ai-askme-modal").showModal();
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
    <div 
      className="bg-my-bg-card fixed top-0 left-0 h-screen flex flex-col shadow-lg text-xl w-64"
    >
      {/* Profile Section */}
      <div className="p-6 border-b">
        <div className="flex items-center space-x-4">
          {/* Profile Picture */}
          <div className="w-12 h-12 rounded-full overflow-hidden flex items-center justify-center">
            <img 
              src={profileData.imageUrl} 
              alt="profilePic" 
              className="w-full h-full object-cover rounded-full transition-all duration-200"
              onClick={() => document.getElementById('userProfile').showModal()} 
            />
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
          <ul className="space-y-4">
            {/* Full menu */}
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
              icon={IoIosPaper}
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

        {/* AI section */}
        <div className="px-4 flex flex-col gap-2">
          <button
            className="w-full flex items-center space-x-3 px-4 py-3 rounded-xl bg-my-secon transition-colors transform hover:scale-105 duration-200 text-white"
            onClick={hdlAISummary}
          >
            <MdSummarize className="h-6 w-6" />
            <span>AI Summary</span>
          </button>
          <button
            className="w-full flex items-center space-x-3 px-4 py-3 rounded-xl bg-my-secon transition-colors transform hover:scale-105 duration-200 text-white"
            onClick={hdlAIAskme}
          >
            <FaQuestionCircle className="h-6 w-6" />
            <span>AI Ask Me</span>
          </button>
        </div>
      </div>

      {/* Logout Button */}
      <div className="p-4">
        <button
          onClick={hdlLogout}
          className="w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors
            bg-red-600 text-white hover:bg-red-700"
        >
          <LogOut className="h-7 w-7" />
          <span>Logout</span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
