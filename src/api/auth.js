import axios from "axios";

const baseUrl = import.meta.env.VITE_API_BASE_URL;

export const userRegister = (registerData) => {
  return axios.post(`${baseUrl}/auth/register`, registerData);
};

export const userLogin = (loginData) => {
  return axios.post(`${baseUrl}/auth/login`, loginData);
};

export const userLoginGoogle = (token) => {
  return axios.post(`${baseUrl}/auth/google_api`, { token });
};
