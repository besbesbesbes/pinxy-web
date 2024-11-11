import { MdOutlineReport } from "react-icons/md";
import { IoIosClose } from "react-icons/io";
import { IoSendSharp } from "react-icons/io5";
import { useEffect, useState } from "react";
import { getReportPostReasonApi, reportPostApi } from "../apis/post-api";
import useUserStore from "../stores/userStore";
import usePostStore from "../stores/postStore";
import { motion, AnimatePresence } from "framer-motion";
function Report_post_modal() {
  const [confirming, setConfirming] = useState(false);
  const [reasons, setReasons] = useState([]);
  const [input, setInput] = useState("");
  const curPostId = usePostStore((state) => state.curPostId);
  const token = useUserStore((state) => state.token);
  const hdlClosePopup = (e) => {
    setInput("");
    document.getElementById("report-post-modal").close();
  };
  const hdlReportPost = async () => {
    if (!confirming) {
      setConfirming(true);
    } else {
      try {
        if (!input) {
          console.log("Please select reason.");
          return;
        }
        await reportPostApi(token, curPostId, input);
        setInput("");
        hdlClosePopup();
      } catch (err) {
        console.log(err.response.data.error || err.message);
      } finally {
        setConfirming(false);
      }
      setConfirming(false);
    }
  };
  const getReportPostReason = async () => {
    const result = await getReportPostReasonApi(token);
    setReasons(result.data.reasons);
  };
  useEffect(() => {
    getReportPostReason();
  }, []);
  return (
    <div
      className="w-4/12 max-h-full bg-my-bg-card fixed left-1/2 top-1/2 -translate-y-1/2 -translate-x-1/2 flex flex-col py-5 px-10 rounded-xl gap-5"
      onClick={(e) => {
        e.stopPropagation();
      }}
    >
      {/* <button onClick={() => console.log(input)}>input</button> */}
      <div className="flex justify-between">
        <p className="text-xl flex items-baseline">
          <MdOutlineReport className="text-4xl translate-y-1 text-my-prim" />
          Report Post
        </p>
        {/* close button */}
        <button
          className="btn w-[50px] h-[50px] bg-my-text bg-opacity-5 text-my-text rounded-full text-4xl font-bold flex justify-center items-center hover:bg-opacity-10 relative"
          onClick={hdlClosePopup}
        >
          <IoIosClose className="absolute" />
        </button>
      </div>
      <p>
        Please let us know why you're reporting this post. This helps us ensure
        the community remains safe and respectful.
      </p>
      <hr />
      <div className="mb-6">
        <label className="block mb-2 text-gray-700 font-semibold">
          Reason for report:
        </label>
        <select
          className="w-full p-2 border rounded-md"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        >
          <option value="" disabled>
            Select a reason
          </option>
          {reasons.map((el, idx) => (
            <option key={idx} value={el?.id}>
              {el?.content}
            </option>
          ))}
        </select>
      </div>
      <div className="flex justify-between">
        <p className="flex-1 text-my-text text-opacity-50">
          <strong>Warning:</strong> Reports made with the intent to persecute or
          harm others may lead to restrictions on your account.
        </p>
        <button
          className="btn self-end bg-my-secon hover:bg-my-secon-hover"
          onClick={hdlReportPost}
        >
          <AnimatePresence mode="wait">
            {confirming ? (
              <motion.span
                key="confirmText"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 0 }}
                transition={{ duration: 0.3 }}
                className="text-white text-lg"
              >
                Confirm
              </motion.span>
            ) : (
              <motion.div
                key="trashIcon"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 0 }}
                transition={{ duration: 0.3 }}
                className="text-2xl text-white"
              >
                <IoSendSharp className="text-2xl text-white" />
              </motion.div>
            )}
          </AnimatePresence>
        </button>
      </div>
    </div>
  );
}

export default Report_post_modal;
