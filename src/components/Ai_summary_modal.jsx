import { useEffect, useState } from "react";
import usePostStore from "../stores/postStore";
import { getAiSummaryApi } from "../apis/post-api";
import useUserStore from "../stores/userStore";
import { AiFillOpenAI } from "react-icons/ai";
import { IoIosClose } from "react-icons/io";
import { AiOutlineOpenAI } from "react-icons/ai";
import { MdSummarize } from "react-icons/md";

function Ai_summary_modal() {
  const token = useUserStore((state) => state.token);
  const postForAI = usePostStore((state) => state.postForAI);
  const aiSummaryTrigger = usePostStore((state) => state.aiSummaryTrigger);
  const [input, setInput] = useState("");
  const setAiSummaryTrigger = usePostStore(
    (state) => state.setAiSummaryTrigger
  );
  const hdlClosePopup = (e) => {
    setAiSummaryTrigger(false);
    setInput("");
    document.getElementById("ai-summary-modal").close();
  };
  const getAiSummary = async () => {
    try {
      if (!aiSummaryTrigger) {
        return;
      }
      console.log("Call AI Summary");
      const resp = await getAiSummaryApi(token, postForAI);
      console.log(resp.data.summary);
      setInput(resp.data.summary);
    } catch (err) {
      console.log(err.response.data.error || err.message);
    } finally {
      setAiSummaryTrigger(false);
    }
  };
  useEffect(() => {
    getAiSummary();
  }, [aiSummaryTrigger]);
  return (
    <div
      className="w-5/12 max-h-full bg-my-bg-card fixed left-1/2 top-1/2 -translate-y-1/2 -translate-x-1/2 flex flex-col pt-5 pb-10 px-10 rounded-xl gap-5"
      onClick={(e) => {
        e.stopPropagation();
      }}
    >
      <div className="flex justify-between">
        <p className="text-xl flex items-baseline">
          <MdSummarize className="text-4xl translate-y-1 text-my-prim mr-2" />
          Summary
        </p>
        {/* close button */}
        <button
          className="btn w-[50px] h-[50px] bg-my-text bg-opacity-5 text-my-text rounded-full text-4xl font-bold flex justify-center items-center hover:bg-opacity-10 relative"
          onClick={hdlClosePopup}
        >
          <IoIosClose className="absolute" />
        </button>
      </div>
      {/* text area */}
      {input ? (
        <div className="relative border border-my-prim border-opacity-50 overflow-auto rounded-2xl">
          <textarea
            className="bg-slate-50 min-h-[300px] p-5  flex-1 self-start resize-none w-full text-xl "
            value={input}
          />
          <div className="w-full flex justify-end absolute bottom-0 -translate-x-2 -translate-y-2">
            <div className="w-fit self-end flex items-center text-white px-2 py-1 bg-blue-500 rounded-full gap-1 justify-center">
              <p className="text-sm italic">powered by</p>
              <AiOutlineOpenAI className="text-2xl" />
            </div>
          </div>
        </div>
      ) : (
        <div className="bg-slate-50 min-h-[300px] p-5 rounded-2xl flex-1 self-start resize-none w-full shadow-md text-xl text-my-text text-opacity-40 flex justify-center items-center border border-my-prim border-opacity-50 overflow-auto">
          <span className="loading loading-spinner w-[90px]"></span>
        </div>
      )}
    </div>
  );
}

export default Ai_summary_modal;
