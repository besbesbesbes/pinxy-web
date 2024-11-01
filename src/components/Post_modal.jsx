import { IoIosClose } from "react-icons/io";
import { BsThreeDots } from "react-icons/bs";
import usePostStore from "../stores/postStore";
import axios from "axios";
import { useEffect, useRef, useState } from "react";
import {
  getPostApi,
  addCommentApi,
  delCommentApi,
  upPostApi,
  downPostApi,
  upCommentApi,
  downCommentApi,
} from "../apis/post-api";
import { format } from "timeago.js";
import { ImArrowUp, ImArrowDown } from "react-icons/im";
import { IoSendSharp, IoTrashBin } from "react-icons/io5";
import { MdModeEdit } from "react-icons/md";

function Post_modal() {
  const curPostId = usePostStore((state) => state.curPostId);
  const setCurPostId = usePostStore((state) => state.setCurPostId);
  const curCommentId = usePostStore((state) => state.curCommentId);
  const setCurCommentId = usePostStore((state) => state.setCurCommentId);
  const reloadPost = usePostStore((state) => state.reloadPost);
  const setReloadPost = usePostStore((state) => state.setReloadPost);
  const [post, setPost] = useState("");
  const [selectedPic, setSelectedPic] = useState(0);
  const [input, setInput] = useState("");
  const hdlClosePopup = (e) => {
    setCurPostId(null);
    setPost("");
    setSelectedPic(0);
    setInput("");
    document.getElementById("post-modal").close();
  };
  const hldCurPic = (idx) => {
    setSelectedPic(idx);
  };
  const getPost = async () => {
    try {
      const result = await getPostApi(curPostId);
      console.log(result.data.resPost);
      setPost(result.data.resPost);
    } catch (err) {
      console.log(err.response.data.error || err.message);
    }
  };
  const hdlUpPost = async () => {
    try {
      await upPostApi(curPostId);
      getPost();
    } catch (err) {
      console.log(err.response.data.error || err.message);
    }
  };
  const hdlDownPost = async () => {
    try {
      await downPostApi(curPostId);
      getPost();
    } catch (err) {
      console.log(err.response.data.error || err.message);
    }
  };
  const hdlAddComment = async () => {
    try {
      const result = await addCommentApi(input, curPostId);
      setInput("");
      getPost();
    } catch (err) {
      console.log(err.response.data.error || err.message);
    }
  };
  const hdlDelComment = async (commentId) => {
    try {
      await delCommentApi(commentId);
      getPost();
    } catch (err) {
      console.log(err?.response?.data?.error || err.message);
    }
  };
  const hdlEditComment = async (commentId) => {
    setCurCommentId(commentId);
    document.getElementById("post-comment-edit-modal").showModal();
  };
  const hdlUpComment = async (commentId) => {
    try {
      await upCommentApi(commentId);
      getPost();
    } catch (err) {
      console.log(err?.response?.data?.error || err.message);
    }
  };
  const hdlDownComment = async (commentId) => {
    try {
      await downCommentApi(commentId);
      getPost();
    } catch (err) {
      console.log(err?.response?.data?.error || err.message);
    }
  };

  useEffect(() => {
    if (curPostId) {
      getPost();
    }
  }, [curPostId]);
  useEffect(() => {
    if (reloadPost) {
      getPost();
      setReloadPost(false);
    }
  }, [reloadPost]);

  return (
    post && (
      <div
        className="w-6/12 max-h-full bg-my-bg-card fixed left-1/2 top-1/2 -translate-y-1/2 -translate-x-1/2 flex flex-col py-5 px-10 rounded-xl"
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <div
          className="flex flex-col gap-5 overflow-auto"
          style={{ scrollbarWidth: "none", msOverflowStyle: "auto" }}
        >
          {/* <button onClick={() => console.log(curPostId)}>curPostId</button>
          <button onClick={() => console.log(curCommentId)}>
            curCommentId
          </button> */}
          {/* user area */}
          <div className="flex gap-5">
            <img
              className="w-[80px] h-[80px] object-cover rounded-full shadow-md"
              src={post?.user?.imageUrl}
              alt="no load"
            />
            <div className="flex flex-col justify-between text-my-text w-full flex-1">
              <div className="flex justify-between">
                <p className="text-2xl translate-y-2">
                  {post?.user?.displayName}
                </p>
                {/* button */}
                <div className="flex">
                  {/* setting button */}
                  <details className="dropdown">
                    <summary className="w-[50px] h-[50px] btn rounded-full font-bold bg-my-bg-card border-none shadow-none hover:bg-my-text hover:bg-opacity-10 text-2xl">
                      <BsThreeDots className="absolute" />
                    </summary>
                    <ul className="menu dropdown-content rounded-box z-[1] w-[100px] p-2 shadow text-xl bg-slate-100 -translate-x-[50px]">
                      <li>
                        <p>Edit</p>
                      </li>
                      <li>
                        <p>Delete</p>
                      </li>
                      <li>
                        <p>Report</p>
                      </li>
                    </ul>
                  </details>
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
                <p className="text-slate-500">{format(post?.createdAt)}</p>
                <p className="text-slate-500 italic">
                  ...End {format(post?.expirationDate)}
                </p>
              </div>
            </div>
          </div>
          {/* text content area */}
          <div>
            <p className="text-2xl">{post?.content}</p>
          </div>
          {/* picture content area */}
          <img
            className="max-h-[400px] object-cover rounded-xl"
            src={post?.images[selectedPic]?.imageUrl}
            alt=""
          />
          <div className="flex w-[80px] gap-2">
            {post?.images.map((el, idx) => (
              <img
                className="h-[75px] min-w-[75px] object-cover hover:border-[5px] hover:border-my-prim rounded-md"
                key={idx}
                src={el.imageUrl}
                alt="no load"
                onClick={() => hldCurPic(idx)}
              />
            ))}
          </div>
          <div className="flex flex-col">
            {/* engaging area */}
            <div className="w-full flex justify-between text-my-text text-opacity-70 text-lg">
              <div className="flex items-baseline gap-2">
                <div className="flex items-baseline gap-1">
                  <p>{post?.upVoteCount}</p>
                  <ImArrowUp className="text-my-prim-hover" />
                </div>
                <div className="flex items-baseline gap-1">
                  <p>{post?.downVoteCount}</p>
                  <ImArrowDown className="text-my-acct-hover" />
                </div>
              </div>
              <p>{post?._count.comments} comments</p>
            </div>
            {/* vote area */}
            <div className="w-full h-[50px] border-x-0 border-[2px] border-my-text border-opacity-20 flex justify-evenly text-lg text-my-text text-opacity-20 font-bold items-center gap-20">
              <button
                className="flex gap-2 items-baseline hover:text-my-prim cursor-pointer"
                onClick={hdlUpPost}
              >
                <ImArrowUp className="text-2xl font-bold" /> UP
              </button>

              <button
                className="flex gap-2 items-baseline hover:text-my-acct cursor-pointer"
                onClick={hdlDownPost}
              >
                <ImArrowDown className="text-2xl font-bold" /> DOWN
              </button>
            </div>
          </div>
          {/* comments area */}
          <div className="flex flex-col gap-5 text-lg">
            {post?.comments.map((el, idx) => (
              <div key={idx} className="flex justify-between gap-2">
                <div className="flex gap-4">
                  <img
                    className="w-[60px] h-[60px] object-cover rounded-full"
                    src={el.user.imageUrl}
                    alt="no load"
                  />
                  <div className="flex flex-col h-[60px] justify-between text-my-text text-opacity-20 text-xl py-1">
                    <ImArrowUp
                      className="cursor-pointer hover:text-my-prim"
                      onClick={() => hdlUpComment(el.id)}
                    />
                    <ImArrowDown
                      className="cursor-pointer hover:text-my-acct"
                      onClick={() => hdlDownComment(el.id)}
                    />
                  </div>
                  <div className="flex flex-col">
                    <div className="flex flex-col rounded-2xl bg-my-text bg-opacity-5 p-3">
                      <p className="font-bold">{el.user.displayName}</p>
                      <div className="flex flex-col">
                        <p>{el.content}</p>
                      </div>
                    </div>
                    <div className="flex gap-2 text-sm text-my-text text-opacity-50">
                      <p className=" pl-2 ">{format(el.createdAt)}</p>
                      <div className="flex items-baseline gap-1">
                        <p>{el.upVoteCount}</p>
                        <ImArrowUp className="text-my-secon-hover" />
                      </div>
                      <div className="flex items-baseline gap-1">
                        <p>{el.downVoteCount}</p>
                        <ImArrowDown className="text-my-acct-hover" />
                      </div>
                    </div>
                  </div>
                </div>
                {/* comment setting button */}
                {/* setting button */}
                <div className="flex gap-1">
                  <button
                    className="btn btn-circle btn-sm bg-opacity-0 border-none shadow-none flex justify-center items-center "
                    onClick={() => hdlEditComment(el.id)}
                  >
                    <MdModeEdit className="text-lg text-my-text text-opacity-20" />
                  </button>
                  <button
                    className="btn btn-circle btn-sm bg-opacity-0 border-none shadow-none flex justify-center items-center "
                    onClick={() => hdlDelComment(el.id)}
                  >
                    <IoTrashBin className="text-lg text-my-text text-opacity-20" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
        {/* new comment area */}
        <div className="flex border-x-0 border-b-0 border-[2px] border-my-text border-opacity-20 pt-5 gap-2 items-start">
          <img
            className="w-[60px] h-[60px] object-cover rounded-full shadow-md"
            src={post?.user?.imageUrl}
            alt="no load"
          />
          <textarea
            placeholder="What's on your mind..."
            className="bg-my-text bg-opacity-5 min-h-[100px] p-5 rounded-2xl flex-1 self-start resize-none"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <button className="btn self-end bg-my-secon hover:bg-my-secon-hover">
            <IoSendSharp
              className="text-2xl text-white"
              onClick={hdlAddComment}
            />
          </button>
        </div>
      </div>
    )
  );
}

export default Post_modal;
