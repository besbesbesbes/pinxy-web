import axios from "axios";
import useUserStore from "../stores/userStore";
import createAuthHeader from "../utils/createAuthHeader";
const baseUrl = import.meta.env.VITE_API_BASE_URL;
const token = useUserStore.getState().token;

export const getAllPost = (body) => {
  return axios.post(`${baseUrl}/search`, body, createAuthHeader(token));
};

export const getAllPostByValue = (body) => {
  return axios.post(`${baseUrl}/search/val`, body, createAuthHeader(token));
};

export const getAllPostByCategory = (body) => {
  return axios.post(
    `${baseUrl}/search/category`,
    body,
    createAuthHeader(token)
  );
};

export const getAllPostByUserId = (body) => {
  return axios.post(`${baseUrl}/search/user`, body, createAuthHeader(token));
};

export const getUserApi = (displayName) => {
  return axios.post(
    `${baseUrl}/search/following`,
    { displayName },
    createAuthHeader(token)
  );
};

export const getFollowingApi = (body) => {
  return axios.post(
    `${baseUrl}/search/following-list`,
    body,
    createAuthHeader(token)
  );
};
