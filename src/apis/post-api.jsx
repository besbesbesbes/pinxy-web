import axios from "axios";
import useUserStore from "../stores/userStore";
const baseUrl = import.meta.env.VITE_API_BASE_URL;

export const getPostApi = async (token, curPostId) =>
  await axios.post(
    `${baseUrl}/post`,
    {
      postId: curPostId,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
export const getUserForNewPostApi = async (token) =>
  await axios.get(`${baseUrl}/post/new/user`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
export const newPostApi = async (token, body) =>
  await axios.post(`${baseUrl}/post/new`, body, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
export const upPostApi = async (token, curPostId) =>
  await axios.post(
    `${baseUrl}/post/up`,
    {
      postId: curPostId,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
export const downPostApi = async (token, curPostId) =>
  await axios.post(
    `${baseUrl}/post/down`,
    {
      postId: curPostId,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
export const getCommentApi = async (token, commentId) =>
  await axios.post(
    `${baseUrl}/post/comment`,
    { commentId },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
export const addCommentApi = async (token, input, postId) =>
  await axios.post(
    `${baseUrl}/post/comment/add`,
    {
      postId,
      commentTxt: input,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
export const delCommentApi = async (token, commentId) =>
  await axios.post(
    `${baseUrl}/post/comment/delete`,
    {
      commentId,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
export const editCommentApi = async (token, input, commentId) =>
  await axios.patch(
    `${baseUrl}/post/comment/edit`,
    {
      commentId,
      commentTxt: input,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
export const upCommentApi = async (token, commentId) =>
  await axios.post(
    `${baseUrl}/post/comment/up`,
    {
      commentId,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
export const downCommentApi = async (token, commentId) =>
  await axios.post(
    `${baseUrl}/post/comment/down`,
    {
      commentId,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

export const getReportPostReasonApi = async (token) =>
  await axios.get(`${baseUrl}/post/report/post`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
export const reportPostApi = async (token, postId, reasonId) =>
  await axios.post(
    `${baseUrl}/post/report/post`,
    { postId, reasonId },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

export const getReportUserReasonApi = async (token) =>
  await axios.get(`${baseUrl}/post/report/user`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
export const reportUserApi = async (token, reportedUserId, reasonId) =>
  await axios.post(
    `${baseUrl}/post/report/user`,
    { reportedUserId, reasonId },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

export const getReportedUserApi = async (token, reportedUserId) =>
  await axios.post(
    `${baseUrl}/post/report/reported-user`,
    { reportedUserId },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
