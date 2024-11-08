import Post_modal from "./Post_modal";
import Post_comment_edit_modal from "./Post_comment_edit_modal";
import Report_post_modal from "./Report_post_modal";
import Report_user_modal from "./Report_user_modal";
import Post_new_modal from "./Post_new_modal";
import Post_delete_modal from "./Post_delete_modal";
import Post_edit_modal from "./Post_edit_modal";
import Error_modal from "./Error_modal";
import Ai_summary_modal from "./Ai_summary_modal";
import Ai_askme_modal from "./Ai_askme_modal";

function Modal() {
  return (
    <>
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
      {/* error-modal */}
      <dialog id="error-modal" className="modal">
        <Error_modal />
      </dialog>
      {/* ai-summary-modal */}
      <dialog id="ai-summary-modal" className="modal">
        <Ai_summary_modal />
      </dialog>
      {/* ai-askme-modal */}
      <dialog id="ai-askme-modal" className="modal">
        <Ai_askme_modal />
      </dialog>
    </>
  );
}

export default Modal;
