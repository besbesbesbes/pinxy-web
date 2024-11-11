import axios from "axios";
const baseUrl = import.meta.env.VITE_API_BASE_URL;
const headerToken = import.meta.env.VITE_API_HEADER

export const followUserApi = (body) => {
  return axios.post(`${baseUrl}/follow`, body, headerToken);
};

export const unfollowUserApi = (body) => {
  return axios.post(`${baseUrl}/follow/unfollow`, body, headerToken);
};

export const getFollowingInfoApi = (body) => {
  return axios.post(`${baseUrl}/follow/userinfo`, body);
};
