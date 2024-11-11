import axios from "axios";

const baseUrl = import.meta.env.VITE_API_BASE_URL;
const headerToken = import.meta.env.VITE_API_HEADER

export const reportUser = () => {
    return axios.post(`${baseUrl}/admin/searchReportUser`, headerToken)
}

export const bannedUser = () => {
    return axios.post(`${baseUrl}/admin/searchBanUser`, headerToken)
}

export const searchTextUser = (text) => {
    return axios.post(`${baseUrl}/admin/search/user/`, {
        "query": text
    }, headerToken)
}

export const banUser = (id) => {
    return axios.post(`${baseUrl}/admin/ban/user/${id}`, headerToken)
}

export const unbanUser = (id) => {
    return axios.post(`${baseUrl}/admin/unban/user/${id}`, headerToken)
}

export const reportPost = () => {
    return axios.post(`${baseUrl}/admin/searchReportPost`, headerToken)
}

export const bannedPost = () => {
    return axios.post(`${baseUrl}/admin/searchBanPost`, headerToken)
}

export const unBanPost = (id) => {
    return axios.post(`${baseUrl}/admin/unban/post/${id}`, headerToken)
}

export const searchTextPost = (text) => {
    return axios.post(`${baseUrl}/admin/search/post/`, {
        "query": text
    }, headerToken)
}

export const rejectPost = () => {
    return axios.post(`${baseUrl}/admin/searchRejectedPost/${id}`, headerToken)
}

export const ApprovePost = () => {
    return axios.post(`${baseUrl}/admin/approve/post/${id}`, headerToken)
}

export const waitingApprove = () => {
    return axios.post(`${baseUrl}/admin/searchWaitApprove`, headerToken)
}

export const rejectedPost = () => {
    return axios.post(`${baseUrl}/admin/searchRejectedPost`, headerToken)
}

export const banPost = (id) => {
    return axios.post(`${baseUrl}/admin/ban/post/${id}`, headerToken)
}

export const gotoRejectPost = (id) => {
    return axios.post(`${baseUrl}/admin/reject/post/${id}`, headerToken)
}

export const gotoApprovePost = (id) => {
    return axios.post(`${baseUrl}/admin/approve/post/${id}`, headerToken)
}