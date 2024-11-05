import axios from "axios";

const baseUrl = import.meta.env.VITE_API_BASE_URL;

export const getProfile = (id) => {
    return axios.get(`${baseUrl}/user/${id}`)
}

export const updateProfile = (editData) => {
    return axios.patch(`${baseUrl}/user/update-info`, editData)
}

export const updateProfilePic = (data, token) => {
    return axios.patch(`${baseUrl}/user/update-profile-pic`, data, {
        headers: { Authorization: `Bearer' ${token}` }
    })
}

export const changePassword = (passwordData) => {
    return axios.patch(`${baseUrl}/user/update-password`, passwordData)
}
