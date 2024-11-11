import axios from "axios";
const baseUrl = import.meta.env.VITE_API_BASE_URL;
const headerToken = import.meta.env.VITE_API_HEADER

export const getAllPost = (body) => {
  return axios.post(`${baseUrl}/search`, body,
    {
      headers: {
        Authorization: `Bearer ${token}`,
  }
})};

export const getAllPostByValue = (body) => {
  return axios.post(`${baseUrl}/search/val`, body, headerToken);
};

export const getAllPostByCategory = (body) => {
  return axios.post(`${baseUrl}/search/category`, body, headerToken);
};

export const getAllPostByUserId = (body) => {
  return axios.post(`${baseUrl}/search/user`, body, headerToken);
};

export const getUserApi = (displayName) => {
  return axios.post(`${baseUrl}/search/following`, { displayName }, headerToken);
};

export const getFollowingApi = (body) => {
  return axios.post(`${baseUrl}/search/following-list`, body, headerToken);
};
