import axios from "axios";

const baseUrl = import.meta.env.VITE_API_BASE_URL;

// export const getProfile = (id) => {
//     return axios.get(`${baseUrl}/auth/register/${id}`)
// }

export const updateProfile = (editData) => {
    return axios.patch(`${baseUrl}/auth/register`, editData)
}

