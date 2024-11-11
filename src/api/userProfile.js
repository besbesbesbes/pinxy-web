import axios from "axios";

const baseUrl = import.meta.env.VITE_API_BASE_URL;
const headerToken = import.meta.env.VITE_API_HEADER

export const getProfile = (id) => {
    return axios.get(`${baseUrl}/user/${id}`, headerToken)
}

export const updateProfile = (editData) => {
    return axios.patch(`${baseUrl}/user/update-info`, editData, headerToken)
}

export const updateProfilePic = (data, token) => {
    return axios.patch(`${baseUrl}/user/update-profile-pic`, data, headerToken)
}

export const changePassword = (passwordData) => {
    return axios.patch(`${baseUrl}/user/update-password`, passwordData, headerToken)
}

export const sendResetPassword = (resetPasswordData) => {
    return axios.post(`${baseUrl}/user/send-reset`, resetPasswordData, headerToken)
}

export const resetPassword = (password) => {
    return axios.patch(`${baseUrl}/user/reset-password`, password, headerToken)
}