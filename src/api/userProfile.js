import axios from "axios";
import useUserStore from "../stores/userStore";
import createAuthHeader from "../utils/createAuthHeader";

const baseUrl = import.meta.env.VITE_API_BASE_URL;
const token = useUserStore.getState().token;

export const getProfile = (id) => {
  return axios.get(`${baseUrl}/user/${id}`, createAuthHeader(token));
};

export const updateProfile = (editData) => {
  return axios.patch(
    `${baseUrl}/user/update-info`,
    editData,
    createAuthHeader(token)
  );
};

export const updateProfilePic = (data, token) => {
  return axios.patch(
    `${baseUrl}/user/update-profile-pic`,
    data,
    createAuthHeader(token)
  );
};

export const changePassword = (passwordData) => {
  return axios.patch(
    `${baseUrl}/user/update-password`,
    passwordData,
    createAuthHeader(token)
  );
};

export const sendResetPassword = (resetPasswordData) => {
  return axios.post(
    `${baseUrl}/user/send-reset`,
    resetPasswordData,
    createAuthHeader(token)
  );
};

export const resetPassword = (password) => {
  return axios.patch(
    `${baseUrl}/user/reset-password`,
    password,
    createAuthHeader(token)
  );
};
