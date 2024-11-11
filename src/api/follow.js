import axios from "axios";
import useUserStore from "../stores/userStore";
import createAuthHeader from "../utils/createAuthHeader";
const baseUrl = import.meta.env.VITE_API_BASE_URL;
const token = useUserStore.getState().token;

export const followUserApi = (body) => {
  return axios.post(`${baseUrl}/follow`, body, createAuthHeader(token));
};

export const unfollowUserApi = (body) => {
  return axios.post(`${baseUrl}/follow/unfollow`, body, createAuthHeader(token));
};

export const getFollowingInfoApi = (body) => {
  return axios.post(`${baseUrl}/follow/userinfo`, body, createAuthHeader(token));
};
