import React, { useState } from "react";
import usePostStore from "../stores/postStore";
import Post_form from "./Post_form";
import Post_post from "./Post_post";
import createError from "../utils/createError";
import useErrStore from "../stores/errStore";

function Posts() {
  const curPostId = usePostStore((state) => state.curPostId);
  const setCurPostId = usePostStore((state) => state.setCurPostId);
  const curUserId = usePostStore((state) => state.setCurPostId);
  const setCurUserId = usePostStore((state) => state.setCurUserId);
  const setErrTxt = useErrStore((state) => state.setErrTxt);
  const [input, setInput] = useState("");
  const hdlShowPost = () => {
    setCurPostId(+input); //<----------------hard code post id
    document.getElementById("post-modal").showModal();
  };
  const hdlReportUser = () => {
    setCurUserId(+input);
    document.getElementById("report-user-modal").showModal();
  };
  const hdlNewPost = () => {
    document.getElementById("post-new-modal").showModal();
  };
  const RefreshPost = () => {
    setCurPostId(+input);
  };
  const testError = () => {
    createError(setErrTxt, "This is error very much");
  };
  return (
    <>
      <div>Posts</div>
      <input
        type="text"
        className="input input-bordered"
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      <button className="btn btn-primary" onClick={hdlShowPost}>
        Show post modal
      </button>
      <button className="btn btn-primary" onClick={hdlNewPost}>
        CreateNewPost
      </button>
      <button className="btn btn-primary" onClick={hdlReportUser}>
        ReportUser
      </button>
      <button className="btn btn-primary" onClick={RefreshPost}>
        RefreshPost
      </button>
      <button className="btn btn-primary" onClick={testError}>
        Test Error
      </button>
      <Post_form />
      <Post_post />
    </>
  );
}

export default Posts;
