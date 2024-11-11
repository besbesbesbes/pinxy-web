import axios from "axios";

const baseUrl = import.meta.env.VITE_API_BASE_URL;

export const reportUser = () => {
    return axios.post(`${baseUrl}/admin/searchReportUser`)
}

export const bannedUser = () => {
    return axios.post(`${baseUrl}/admin/searchBanUser`)
}

export const searchTextUser = (text) => {
    return axios.post(`${baseUrl}/admin/search/user/`,{
        "query" : text
    })
}

export const banUser = (id)=> {
   return axios.post(`${baseUrl}/admin/ban/user/${id}`)
}

export const unbanUser = (id) => {
    return axios.post(`${baseUrl}/admin/unban/user/${id}`)
}

export const reportPost = () => {
    return axios.post(`${baseUrl}/admin/searchReportPost`)
}

export const bannedPost = () => {
    return axios.post(`${baseUrl}/admin/searchBanPost`)
}

export const unBanPost = (id) => {
    return axios.post(`${baseUrl}/admin/unban/post/${id}`)
}

export const searchTextPost = (text) => {
    return axios.post(`${baseUrl}/admin/search/post/`,{
        "query" : text
    })
}

export const rejectPost = () => {
    return axios.post(`${baseUrl}/admin/searchRejectedPost/${id}`)
}

export const ApprovePost = () => {
    return axios.post(`${baseUrl}/admin/approve/post/${id}`)
}

export const waitingApprove = () => {
    return axios.post(`${baseUrl}/admin/searchWaitApprove`)
}

export const rejectedPost = () => {
    return axios.post(`${baseUrl}/admin/searchRejectedPost`)
}

export const banPost = (id) => {
    return axios.post(`${baseUrl}/admin/ban/post/${id}`)
}

export const gotoRejectPost = (id) => {
    return axios.post(`${baseUrl}/admin/reject/post/${id}`)
}

export const gotoApprovePost = (id) => {
    return axios.post(`${baseUrl}/admin/approve/post/${id}`)
}