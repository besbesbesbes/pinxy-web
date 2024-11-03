import React, { useState } from "react";
import Post_modal from "./Post_modal";
import usePostStore from "../stores/postStore";
import Post_comment_edit_modal from "./Post_comment_edit_modal";
import Report_post_modal from "./Report_post_modal";
import Report_user_modal from "./Report_user_modal";
import Post_new_modal from "./Post_new_modal";
import Post_delete_modal from "./Post_delete_modal";
import Post_edit_modal from "./Post_edit_modal";
import Post_form from "./Post_form";
import Post_post from "./Post_post";

function Posts() {
  const curPostId = usePostStore((state) => state.curPostId);
  const setCurPostId = usePostStore((state) => state.setCurPostId);
  const curUserId = usePostStore((state) => state.setCurPostId);
  const setCurUserId = usePostStore((state) => state.setCurUserId);
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
      <Post_form />
      <Post_post />

      {/* post-modal */}
      <dialog id="post-modal" className="modal">
        <Post_modal />
      </dialog>
      {/* post-new-modal */}
      <dialog id="post-new-modal" className="modal">
        <Post_new_modal />
      </dialog>
      {/* post-edit-modal */}
      <dialog id="post-edit-modal" className="modal">
        <Post_edit_modal />
      </dialog>
      {/* post-delete-modal */}
      <dialog id="post-delete-modal" className="modal">
        <Post_delete_modal />
      </dialog>
      {/* post-comment-edit */}
      <dialog id="post-comment-edit-modal" className="modal">
        <Post_comment_edit_modal />
      </dialog>
      {/* report-post-modal */}
      <dialog id="report-post-modal" className="modal">
        <Report_post_modal />
      </dialog>
      {/* report-user-modal */}
      <dialog id="report-user-modal" className="modal">
        <Report_user_modal />
      </dialog>
    </>
  );
}

export default Posts;
