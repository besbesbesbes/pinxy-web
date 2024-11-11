import axios from "axios";
const baseUrl = import.meta.env.VITE_API_BASE_URL;

export const followUserApi = (body) => {
  return axios.post(`${baseUrl}/follow`, body);
};

export const unfollowUserApi = (body) => {
  return axios.post(`${baseUrl}/follow/unfollow`, body);
};

export const getFollowingInfoApi = (body) => {
  return axios.post(`${baseUrl}/follow/userinfo`, body);
};
