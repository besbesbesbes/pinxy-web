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
import { FaQuestionCircle } from "react-icons/fa";
import { MdSummarize } from "react-icons/md";

const MenuItem = ({ icon: Icon, label, isActive, onClick }) => (
  <li>
    <button
      onClick={onClick}
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
  const [isHovered, setIsHovered] = useState(false);
  const postForAI = usePostStore((state) => state.postForAI);
  const user = useUserStore((state) => state.user);
  const activeMenu = usePostStore((state) => state.activeMenu);
  const setActiveMenu = usePostStore((state) => state.setActiveMenu);
  const setAiSummaryTrigger = usePostStore(
    (state) => state.setAiSummaryTrigger
  );
  const setAiAskmeTrigger = usePostStore((state) => state.setAiAskmeTrigger);
  const setSelectedUser = usePostStore((state) => state.setSelectedUser);

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
      className={`bg-my-bg-card fixed top-0 left-0 h-screen flex flex-col shadow-lg text-xl transition-all duration-300 ease-in-out
        ${isHovered ? 'w-64' : 'w-16'}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Profile Section */}
      <div className={`border-b flex justify-center items-center ${!isHovered ? 'py-4' : 'p-6'}`}>
        {!isHovered ? (
          <div className="w-8 h-8 rounded-full bg-my-prim flex items-center justify-center">
            <User className="h-4 w-4 text-white" />
          </div>
        ) : (
          <div className="flex items-center space-x-4 w-full">
            <div className="w-12 h-12 rounded-full bg-my-prim flex items-center justify-center flex-shrink-0">
              <User className="h-6 w-6 text-white" />
            </div>
            <div className="truncate">
              <h3 className="font-bold text-gray-900">Jane Smith</h3>
              <p className="text-sm text-gray-600">Administrator</p>
            </div>
          </div>
        )}
      </div>

      {/* Menu Items */}
      <div className="flex-1">
        <nav className="flex-1 overflow-y-auto p-4">
          <ul className="space-y-4">
            {/* Icon-only view when not hovered */}
            {!isHovered && (
              <>
                <li className="flex justify-center py-2">
                  <RiHome7Fill className={`h-6 w-6 ${activeMenu === "Home" ? "text-white bg-my-prim p-1 rounded-lg" : "text-my-prim text-opacity-60"}`} />
                </li>
                <li className="flex justify-center py-2">
                  <IoIosAlert className={`h-6 w-6 ${activeMenu === "Alert" ? "text-white bg-my-prim p-1 rounded-lg" : "text-my-prim text-opacity-60"}`} />
                </li>
                <li className="flex justify-center py-2">
                  <IoNewspaper className={`h-6 w-6 ${activeMenu === "News" ? "text-white bg-my-prim p-1 rounded-lg" : "text-my-prim text-opacity-60"}`} />
                </li>
                <li className="flex justify-center py-2">
                  <RiShoppingBasketFill className={`h-6 w-6 ${activeMenu === "Shop" ? "text-white bg-my-prim p-1 rounded-lg" : "text-my-prim text-opacity-60"}`} />
                </li>
                <li className="flex justify-center py-2">
                  <MdOutlineWork className={`h-6 w-6 ${activeMenu === "Jobs" ? "text-white bg-my-prim p-1 rounded-lg" : "text-my-prim text-opacity-60"}`} />
                </li>
                <li className="flex justify-center py-2">
                  <BsChatLeftDotsFill className={`h-6 w-6 ${activeMenu === "Other" ? "text-white bg-my-prim p-1 rounded-lg" : "text-my-prim text-opacity-60"}`} />
                </li>
              </>
            )}
            
            {/* Full menu when hovered */}
            {isHovered && (
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
            )}
          </ul>
        </nav>

        {/* AI section */}
        <div className="px-4 flex flex-col gap-2">
          {!isHovered ? (
            <>
              <div className="flex justify-center py-2">
                <MdSummarize className="h-6 w-6 text-my-secon cursor-pointer" onClick={hdlAISummary} />
              </div>
              <div className="flex justify-center py-2">
                <FaQuestionCircle className="h-6 w-6 text-my-secon cursor-pointer" onClick={hdlAIAskme} />
              </div>
            </>
          ) : (
            <>
              <button
                className="w-full flex items-center space-x-3 px-4 py-3 rounded-xl bg-my-secon transition-colors transform hover:scale-105 duration-150 text-white"
                onClick={hdlAISummary}
              >
                <MdSummarize className="h-7 w-7" />
                <span className="font-medium">Summary</span>
              </button>
              <button
                className="w-full flex items-center space-x-3 px-4 py-3 rounded-xl border-my-secon transition-colors border transform hover:scale-105 duration-150 text-my-prim text-opacity-70"
                onClick={hdlAIAskme}
              >
                <FaQuestionCircle className="h-7 w-7" />
                <span className="font-medium">Ask me</span>
              </button>
            </>
          )}
        </div>
      </div>

      {/* Bottom Actions */}
      <div className="p-4 border-t">
        {!isHovered ? (
          <div className="flex justify-center">
            <LogOut className="h-6 w-6 text-my-acct cursor-pointer" />
          </div>
        ) : (
          <ul className="space-y-2">
            <li>
              <button className="w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-my-acct hover:bg-red-50 transition-colors">
                <LogOut className="h-5 w-5" />
                <span className="font-medium">Logout</span>
              </button>
            </li>
          </ul>
        )}
      </div>
    </div>
  );
};

export default Sidebar;