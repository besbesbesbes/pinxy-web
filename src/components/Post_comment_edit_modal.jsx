import usePostStore from "../stores/postStore";
import { getCommentApi } from "../apis/post-api";
import { useEffect, useState } from "react";
import { IoIosClose } from "react-icons/io";
import { IoSendSharp } from "react-icons/io5";
import { format } from "timeago.js";
import { editCommentApi } from "../apis/post-api";
import useUserStore from "../stores/userStore";
import createError from "../utils/createError";
import useErrStore from "../stores/errStore";
function Post_comment_edit_modal() {
  const token = useUserStore((state) => state.token);
  const setErrTxt = useErrStore((state) => state.setErrTxt);
  const curPostId = usePostStore((state) => state.curPostId);
  const setCurPostId = usePostStore((state) => state.setCurPostId);
  const curCommentId = usePostStore((state) => state.curCommentId);
  const setCurCommentId = usePostStore((state) => state.setCurPostId);
  const setReloadPost = usePostStore((state) => state.setReloadPost);
  const [comment, setComment] = useState("");
  const [input, setInput] = useState("");
  const hdlClosePopup = () => {
    // setCurCommentId(null);
    // setComment("");
    document.getElementById("post-comment-edit-modal").close();
  };
  const getComment = async () => {
    try {
      const result = await getCommentApi(token, curCommentId);
      console.log(result.data.comment);
      setComment(result.data.comment);
      setInput(result.data.comment.content);
    } catch (err) {
      console.log(err.response.data.error || err.message);
    }
  };
  const hdlEditComment = async () => {
    try {
      await editCommentApi(token, input, curCommentId);
      setReloadPost(true);
      hdlClosePopup();
    } catch (err) {
      createError(setErrTxt, err.response.data.error);
      console.log(err.response.data.error || err.message);
    }
  };

  useEffect(() => {
    if (curCommentId) {
      getComment();
    }
  }, [curCommentId]);
  return (
    <div
      className="w-5/12 max-h-full bg-my-bg-card fixed left-1/2 top-1/2 -translate-y-1/2 -translate-x-1/2 flex flex-col py-5 px-10 rounded-xl gap-5"
      onClick={(e) => {
        e.stopPropagation();
      }}
    >
      {/* <button onClick={() => console.log(curPostId)}>curPostId</button>
      <button onClick={() => console.log(curCommentId)}>curCommentId</button>
      <button onClick={() => console.log(input)}>input</button> */}

      {/* user area */}
      <div className="flex gap-5">
        <img
          className="w-[80px] h-[80px] object-cover rounded-full shadow-md"
          src={comment?.user?.imageUrl}
          alt="no load"
        />
        <div className="flex flex-col justify-between text-my-text w-full flex-1">
          <div className="flex justify-between">
            <p className="text-2xl translate-y-2">
              {comment?.user?.displayName}
            </p>
            {/* button */}
            <div className="flex">
              {/* close button */}
              <button
                className="btn w-[50px] h-[50px] bg-my-text bg-opacity-5 text-my-text rounded-full text-4xl font-bold flex justify-center items-center hover:bg-opacity-10 relative"
                onClick={hdlClosePopup}
              >
                <IoIosClose className="absolute" />
              </button>
            </div>
          </div>
          <div className="flex justify-between">
            <p className="text-slate-500">{format(comment?.createdAt)}</p>
          </div>
        </div>
      </div>
      {/* comment area */}
      <div className="flex gap-2">
        <textarea
          placeholder="What's on your mind..."
          className="bg-my-text bg-opacity-5 min-h-[100px] p-5 rounded-2xl flex-1 self-start resize-none"
          value={input}
          onChange={(e) => {
            setInput(e.target.value);
          }}
        />
        <button
          className="btn self-end bg-my-secon hover:bg-my-secon-hover"
          onClick={hdlEditComment}
        >
          <IoSendSharp className="text-2xl text-white" />
        </button>
      </div>
    </div>
  );
}

export default Post_comment_edit_modal;
