import { IoIosClose } from "react-icons/io";
import { FaQuestionCircle } from "react-icons/fa";
import usePostStore from "../stores/postStore";
import useUserStore from "../stores/userStore";
import { useEffect, useState } from "react";
import { IoSendSharp } from "react-icons/io5";
import { getProfile } from "../api/userProfile";
import { AiFillOpenAI } from "react-icons/ai";
import { motion, AnimatePresence } from "framer-motion";
import { useRef } from "react";
import { getAiAskmeApi } from "../apis/post-api";

function Ai_askme_modal() {
  const token = useUserStore((state) => state.token);
  const user = useUserStore((state) => state.user);
  const postForAI = usePostStore((state) => state.postForAI);
  const [input, setInput] = useState("");
  const [chats, setChats] = useState([]);
  const [chatsForUser, setChatsForUser] = useState([]);
  const [userForChat, setUserForChat] = useState({});
  const aiAskmeTrigger = usePostStore((state) => state.aiAskmeTrigger);
  const setAiAskmeTrigger = usePostStore((state) => state.setAiAskmeTrigger);
  const chatContainerRef = useRef(null);
  const [isLoading, setIsLoading] = useState(false);
  const hdlClosePopup = () => {
    setAiAskmeTrigger(false);
    setUserForChat({});
    setIsLoading(false);
    setChats([]);
    setChatsForUser([]);
    document.getElementById("ai-askme-modal").close();
  };
  const getUserInfo = async () => {
    try {
      const resp = await getProfile(user.id);
      setUserForChat(resp.data.profileData);
    } catch (err) {
      console.log(err?.response?.data?.error || err.message);
    }
  };
  const getAiAskme = async (e) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      console.log("Call AI Askme");
      addChats(
        "user",
        `In my situation: ${input}, I would like answer and make result like someone telling you about your situation.`
      );
      addChatsForUser("user", input);
      const resp = await getAiAskmeApi(token, [
        ...chats,
        {
          role: "user",
          content: `In my situation: ${input}, I would like answer and make result like your friend telling you about your situation and reply me same language that i ask.`,
        },
      ]);
      addChats("system", resp.data.content);
      addChatsForUser("system", resp.data.content);
    } catch (err) {
      console.log(err.response.data.error || err.message);
    } finally {
      setTimeout(() => {
        setIsLoading(false);
      }, 1000);
      setInput("");
    }
  };
  const addChats = (role, content) => {
    setChats((prv) => [...prv, { role, content }]);
  };
  const addChatsForUser = (role, content) => {
    setChatsForUser((prv) => [...prv, { role, content }]);
  };
  const initialChats = () => {
    const postForAIStr = postForAI.join(", ");
    addChats(
      "user",
      `Following text is my situation now that i want you to remember: ${postForAIStr}`
    );
    addChats(
      "system",
      "I acknowledged that, if you have anything to ask, Go ahead"
    );
    addChatsForUser("system", "Ask me about anything happening around you...");
  };
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  }, [chats]);
  useEffect(() => {
    console.log("useEffect ai ask me");
    getUserInfo();
    setUserForChat({});
    setInput("");
    setChats([]);
    setChatsForUser([]);
    initialChats();
    setAiAskmeTrigger(false);
  }, [aiAskmeTrigger]);
  return (
    <div
      className="w-5/12 max-h-full bg-my-bg-card fixed left-1/2 top-1/2 -translate-y-1/2 -translate-x-1/2 flex flex-col pt-5 pb-10 px-10 rounded-xl gap-1"
      onClick={(e) => {
        e.stopPropagation();
      }}
    >
      {/* <button onClick={() => console.log(chats)}>chats</button> */}
      {/* <button onClick={() => console.log(postForAI)}>postForAI</button> */}

      <div className="flex justify-between mb-4">
        <p className="text-xl flex items-baseline">
          <FaQuestionCircle className="text-4xl translate-y-1 text-my-prim mr-2" />
          Ask me
        </p>
        {/* close button */}
        <button
          className="btn w-[50px] h-[50px] bg-my-text bg-opacity-5 text-my-text rounded-full text-4xl font-bold flex justify-center items-center hover:bg-opacity-10 relative"
          onClick={hdlClosePopup}
        >
          <IoIosClose className="absolute" />
        </button>
      </div>
      {/* chats area */}
      <div
        ref={chatContainerRef}
        className="relative border border-my-prim border-opacity-30 overflow-auto rounded-2xl min-h-[500px] py-5 px-2 flex flex-col gap-2 text-my-text"
      >
        <AnimatePresence>
          {chatsForUser.map((el, idx) =>
            el.role == "user" ? (
              // user chat
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="flex gap-2"
              >
                <img
                  src={userForChat.imageUrl}
                  alt=""
                  className="w-[40px] h-[40px] object-cover rounded-full"
                />
                <div
                  key={idx}
                  className="w-fit px-2 py-1 bg-my-prim bg-opacity-5 rounded-2xl max-w-[400px]"
                >
                  {el.content}
                </div>
              </motion.div>
            ) : (
              // system chat
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="flex gap-2 self-end"
              >
                <div
                  key={idx}
                  className="w-fit px-2 py-1 bg-my-prim bg-opacity-5 rounded-2xl max-w-[400px]"
                >
                  {el.content}
                </div>
                <AiFillOpenAI className="w-[40px] h-[40px] object-cover rounded-full text-blue-500" />
              </motion.div>
            )
          )}
        </AnimatePresence>
      </div>
      {/* input area */}
      <form className="flex gap-2" onSubmit={(e) => getAiAskme(e)}>
        <input
          placeholder="What's happened around me..."
          className={`bg-my-text bg-opacity-5 h-fit px-5 py-2 rounded-xl flex-1 self-start resize-none w-full focus:outline-none ${
            isLoading ? "opacity-50" : ""
          }`}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          disabled={isLoading} // Disable input if isLoading is true
        />
        <button
          type="submit"
          className="btn self-end bg-my-secon hover:bg-my-secon-hover h-[40px]"
          disabled={isLoading} // Disable button if isLoading is true
        >
          {isLoading ? (
            <span className="loading loading-spinner w-[20px]"></span>
          ) : (
            <IoSendSharp className="text-2xl text-white" />
          )}
        </button>
      </form>
    </div>
  );
}

export default Ai_askme_modal;
