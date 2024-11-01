import axios from "axios";
const baseUrl = import.meta.env.VITE_API_BASE_URL;

export const getUserApi = (displayName) => {
  return axios.post(`${baseUrl}/search/following`, {displayName});
};