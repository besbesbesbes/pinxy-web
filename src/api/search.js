import axios from "axios";
const baseUrl = import.meta.env.VITE_API_BASE_URL;

export const getAllPost = (body) => {
  return axios.post(`${baseUrl}/search`, body);
};

export const getAllPostByValue = (body) => {
  return axios.post(`${baseUrl}/search/val`, body);
};

export const getAllPostByCategory = (body) => {
  return axios.post(`${baseUrl}/search/category`, body);
};

export const getAllPostByUserId = (body) => {
  return axios.post(`${baseUrl}/search/user`, body);
};

export const getUserApi = (displayName) => {
  return axios.post(`${baseUrl}/search/following`, { displayName });
};
