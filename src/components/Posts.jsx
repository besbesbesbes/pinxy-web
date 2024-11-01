import React, { useState } from "react";
import Post_modal from "./Post_modal";
import usePostStore from "../stores/postStore";
import Post_comment_edit_modal from "./Post_comment_edit_modal";
import Post_new from "./Post_new";

function Posts() {
  const curPostId = usePostStore((state) => state.curPostId);
  const setCurPostId = usePostStore((state) => state.setCurPostId);
  const [input, setInput] = useState("");
  const hdlShowPost = () => {
    setCurPostId(+input); //<----------------hard code post id
    document.getElementById("post-modal").showModal();
  };
  const hdlNewPost = () => {
    document.getElementById("post-new-modal").showModal();
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
      {/* post-modal */}
      <dialog id="post-modal" className="modal">
        <Post_modal />
      </dialog>
      {/* post-new-modal */}
      <dialog id="post-new-modal" className="modal">
        <Post_new />
      </dialog>
      {/* post-update-modal */}
      {/* post-comment-edit */}
      <dialog id="post-comment-edit-modal" className="modal">
        <Post_comment_edit_modal />
      </dialog>
    </>
  );
}

export default Posts;
