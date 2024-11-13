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
        ${
          isActive ? "bg-my-prim text-white" : "text-my-prim hover:bg-gray-100"
        }`}
    >
      <Icon className="h-10 w-10" />
      {/* <span className="font-medium">{label}</span> */}
    </button>
  </li>
);

const SidebarMini = ({
  setCategoryOption,
  inputRef,
  setValue,
  profileData,
}) => {
  const postForAI = usePostStore((state) => state.postForAI);
  const user = useUserStore((state) => state.user);
  const activeMenu = usePostStore((state) => state.activeMenu);
  const setActiveMenu = usePostStore((state) => state.setActiveMenu);
  const setAiSummaryTrigger = usePostStore(
    (state) => state.setAiSummaryTrigger
  );
  const setAiAskmeTrigger = usePostStore((state) => state.setAiAskmeTrigger);
  const setSelectedUser = usePostStore((state) => state.setSelectedUser);

  const logout = useUserStore((state) => state.logout);
  const navigate = useNavigate();

  const hdlLogout = () => {
    console.log("logout");
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
    <div className="bg-my-bg-card fixed bottom-0 left-0 h-[80px] flex flex-col shadow-[0px_-5px_10px_rgba(0,0,0,0.3)] text-xl w-full py-3 z-30">
      {/* Menu Items */}
      <ul className="flex justify-around">
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

        {/* Profile Picture */}
        <div className="w-16 h-16 rounded-full overflow-hidden flex items-center justify-center">
          <img
            src={profileData.imageUrl}
            alt="profilePic"
            className="w-full h-full object-cover rounded-full transition-all duration-200"
            onClick={() => document.getElementById("userProfile").showModal()}
          />
        </div>
        {/* <dialog id="userProfile" className="modal">
          <div className="modal-box flex flex-col h-1/2 max-w-2xl ">
            <button
              className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2 "
              onClick={() => document.getElementById("userProfile").close()}
            >
              ✕
            </button>
            <UserProfile profileData={profileData} />
          </div>
        </dialog> */}
        <div className="px-4 flex flex-col gap-2 absolute bottom-[100px] right-0">
          <button
            className="w-[60px] h-[60px] flex items-center justify-center space-x-3 px-4 py-3 rounded-full bg-my-prim transition-colors transform hover:scale-105 duration-200 text-white shadow-xl"
            onClick={hdlAISummary}
          >
            <MdSummarize className="h-6 w-6" />
            {/* <span>AI Summary</span> */}
          </button>
          <button
            className="w-[60px] h-[60px] flex items-center justify-center space-x-3 px-4 py-3 rounded-full bg-my-acct transition-colors transform hover:scale-105 duration-200 text-white shadow-xl"
            onClick={hdlAIAskme}
          >
            <FaQuestionCircle className="h-6 w-6" />
            {/* <span>AI Ask Me</span> */}
          </button>
        </div>
      </ul>
    </div>
  );
};

export default SidebarMini;
