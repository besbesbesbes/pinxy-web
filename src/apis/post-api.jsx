import axios from "axios";

const baseUrl = import.meta.env.VITE_API_BASE_URL;

export const getPostApi = async (curPostId) =>
  await axios.post(`${baseUrl}/post`, {
    postId: curPostId,
  });
export const upPostApi = async (curPostId) =>
  await axios.post(`${baseUrl}/post/up`, {
    postId: curPostId,
  });
export const downPostApi = async (curPostId) =>
  await axios.post(`${baseUrl}/post/down`, {
    postId: curPostId,
  });
export const getCommentApi = async (commentId) =>
  await axios.post(`${baseUrl}/post/comment`, { commentId });

export const addCommentApi = async (input, postId) =>
  await axios.post(`${baseUrl}/post/comment/add`, {
    postId,
    commentTxt: input,
  });
export const delCommentApi = async (commentId) =>
  await axios.post(`${baseUrl}/post/comment/delete`, {
    commentId,
  });
export const editCommentApi = async (input, commentId) =>
  await axios.patch(`${baseUrl}/post/comment/edit`, {
    commentId,
    commentTxt: input,
  });
export const upCommentApi = async (commentId) =>
  await axios.post(`${baseUrl}/post/comment/up`, {
    commentId,
  });
export const downCommentApi = async (commentId) =>
  await axios.post(`${baseUrl}/post/comment/down`, {
    commentId,
  });
