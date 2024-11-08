import React, { useState } from "react";
import {
  LogOut,
  User,
} from "lucide-react";
import {
  BsChatLeftDotsFill,
} from "react-icons/bs";
import {
  MdOutlineWork,
} from "react-icons/md";
import {
  RiShoppingBasketFill,
} from "react-icons/ri";
import {
  IoNewspaper,
  IoIosAlert,
} from "react-icons/io";
import {
  RiHome7Fill,
} from "react-icons/ri";
import {
  FaQuestionCircle,
} from "react-icons/fa";
import {
  MdSummarize,
} from "react-icons/md";
import usePostStore from "../stores/postStore";
import useUserStore from "../stores/userStore";
import { useNavigate } from "react-router-dom";
import UserProfile from "./UserProfile";

const MenuItem = ({ icon: Icon, label, isActive, onClick }) => (
  <li>
    <button
      onClick={onClick}
      className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
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

const Sidebar = ({ setCategoryOption, inputRef, setValue, profileData }) => {
  const postForAI = usePostStore((state) => state.postForAI);
  const activeMenu = usePostStore((state) => state.activeMenu);
  const setActiveMenu = usePostStore((state) => state.setActiveMenu);
  const setAiSummaryTrigger = usePostStore(
    (state) => state.setAiSummaryTrigger
  );
  const setAiAskmeTrigger = usePostStore((state) => state.setAiAskmeTrigger);
  const setSelectedUser = usePostStore((state) => state.setSelectedUser);
  const logout = useUserStore((state) => state.logout);
  const navigate = useNavigate();

  const [isHovered, setIsHovered] = useState(false);

  const hdlLogout = () => {
    logout();
    navigate("/");
  };

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
      className={`bg-my-bg-card fixed top-0 left-0 h-screen flex flex-col shadow-lg text-xl transition-all duration-300 ease-in-out ${
        isHovered ? "w-64" : "w-16"
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Profile Section */}
      <div className="p-6 border-b">
        <div className="flex items-center space-x-4">
          <div className="w-12 h-12 rounded-full overflow-hidden flex items-center justify-center">
            <img
              src={profileData.imageUrl}
              alt="profilePic"
              className="w-[45px] h-[45px] object-cover rounded-full"
              onClick={() =>
                document.getElementById("userProfile").showModal()
              }
            />
          </div>
          {isHovered && (
            <div>
              <h3 className="font-bold text-gray-900">
                {profileData.displayName}
              </h3>
              <p className="text-sm text-gray-600">{profileData.name}</p>
            </div>
          )}
        </div>
      </div>
      <dialog id="userProfile" className="modal">
        <div className="modal-box flex flex-col h-1/2 max-w-2xl">
          <button
            className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
            onClick={() => document.getElementById("userProfile").close()}
          >
            ✕
          </button>
          <UserProfile profileData={profileData} />
        </div>
      </dialog>
      {/* Menu Items */}
      <div className="flex-1">
        <nav className="flex-1 overflow-y-auto p-4">
          <ul className="space-y-4">
            {isHovered ? (
              <>
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
              </>
            ) : (
              <>
                <li className="flex justify-center py-2">
                  <RiHome7Fill
                    className={`h-6 w-6 ${
                      activeMenu === "Home"
                        ? "text-white bg-my-prim p-1 rounded-lg"
                        : "text-my-prim text-opacity-60"
                    }`}
                  />
                </li>
                {/* Add similar icons for other categories */}
              </>
            )}
          </ul>
        </nav>
        <div className="px-4 flex flex-col gap-2">
          <MdSummarize
            className="h-6 w-6 text-my-secon cursor-pointer"
            onClick={hdlAISummary}
          />
          <FaQuestionCircle
            className="h-6 w-6 text-my-secon cursor-pointer"
            onClick={hdlAIAskme}
          />
        </div>
      </div>
      <div className="p-4 border-t">
        <ul>
          <li>
            <button
              className="w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-my-acct hover:bg-red-50 transition-colors"
              onClick={hdlLogout}
            >
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
