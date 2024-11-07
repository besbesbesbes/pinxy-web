import { useState } from "react";
import { IoIosClose } from "react-icons/io";
import { IoTrashBin } from "react-icons/io5";
import { motion, AnimatePresence } from "framer-motion";
import usePostStore from "../stores/postStore";
import useUserStore from "../stores/userStore";
import { deletePostApi } from "../apis/post-api";
import { useNavigate } from "react-router-dom";

function Post_delete_modal() {
  const [confirming, setConfirming] = useState(false);
  const curPostId = usePostStore((state) => state.curPostId);
  const token = useUserStore((state) => state.token);
  const navigate = useNavigate();
  const hdlClosePopup = () => {
    setConfirming(false);
    document.getElementById("post-delete-modal").close();
    document.getElementById("post-modal").close();
  };
  const hdlDeletePost = async () => {
    if (!confirming) {
      setConfirming(true);
    } else {
      console.log("confirm delete");
      setConfirming(false);
      await deletePostApi(token, curPostId);
      hdlClosePopup();
      navigate(0);
    }
  };
  return (
    <div
      className="w-4/12 max-h-full bg-my-bg-card fixed left-1/2 top-1/2 -translate-y-1/2 -translate-x-1/2 flex flex-col p-10 rounded-xl gap-5 "
      onClick={(e) => {
        e.stopPropagation();
      }}
    >
      <div className="flex justify-between">
        <p className="text-xl flex items-baseline gap-2">
          <IoTrashBin className="text-4xl translate-y-1 text-my-prim" />
          Delete Post
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
        Are you sure you want to delete this post? This action cannot be undone,
        and the post will be permanently removed.
      </p>
      <hr />
      <div className="flex justify-between">
        <p className="flex-1 text-my-text text-opacity-50">
          <strong>Warning:</strong> Deleting this post is irreversible. Once
          deleted, all associated data will be lost permanently.
        </p>
        <button
          className="btn self-end bg-my-acct hover:bg-my-acct-hover"
          onClick={hdlDeletePost}
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
                <IoTrashBin />
              </motion.div>
            )}
          </AnimatePresence>
        </button>
      </div>
    </div>
  );
}

export default Post_delete_modal;
