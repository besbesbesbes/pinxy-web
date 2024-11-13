import axios from "axios";

const baseUrl = import.meta.env.VITE_API_BASE_URL;
const headerToken = import.meta.env.VITE_API_HEADER;

export const reportUser = () => {
  return axios.post(
    `${baseUrl}/admin/searchReportUser`,
    {},
    createAuthHeader(token)
  );
};

export const bannedUser = () => {
  return axios.post(
    `${baseUrl}/admin/searchBanUser`,
    {},
    createAuthHeader(token)
  );
};

export const searchTextUser = (text) => {
  return axios.post(
    `${baseUrl}/admin/search/user/`,
    {
      query: text,
    },
    createAuthHeader(token)
  );
};

export const banUser = (id) => {
  return axios.post(
    `${baseUrl}/admin/ban/user/${id}`,
    {},
    createAuthHeader(token)
  );
};

export const unbanUser = (id) => {
  return axios.post(
    `${baseUrl}/admin/unban/user/${id}`,
    {},
    createAuthHeader(token)
  );
};

export const reportPost = () => {
  return axios.post(
    `${baseUrl}/admin/searchReportPost`,
    {},
    createAuthHeader(token)
  );
};

export const bannedPost = () => {
  return axios.post(
    `${baseUrl}/admin/searchBanPost`,
    {},
    createAuthHeader(token)
  );
};

export const unBanPost = (id) => {
  return axios.post(
    `${baseUrl}/admin/unban/post/${id}`,
    {},
    createAuthHeader(token)
  );
};

export const searchTextPost = (text) => {
  return axios.post(
    `${baseUrl}/admin/search/post/`,
    {
      query: text,
    },
    createAuthHeader(token)
  );
};

export const rejectPost = () => {
  return axios.post(
    `${baseUrl}/admin/searchRejectedPost/${id}`,
    {},
    createAuthHeader(token)
  );
};

export const ApprovePost = () => {
  return axios.post(
    `${baseUrl}/admin/approve/post/${id}`,
    {},
    createAuthHeader(token)
  );
};

export const waitingApprove = () => {
  return axios.post(
    `${baseUrl}/admin/searchWaitApprove`,
    {},
    createAuthHeader(token)
  );
};

export const rejectedPost = () => {
  return axios.post(
    `${baseUrl}/admin/searchRejectedPost`,
    {},
    createAuthHeader(token)
  );
};

export const banPost = (id) => {
  return axios.post(
    `${baseUrl}/admin/ban/post/${id}`,
    {},
    createAuthHeader(token)
  );
};

export const gotoRejectPost = (id) => {
  return axios.post(
    `${baseUrl}/admin/reject/post/${id}`,
    {},
    createAuthHeader(token)
  );
};

export const gotoApprovePost = (id) => {
  return axios.post(
    `${baseUrl}/admin/approve/post/${id}`,
    {},
    createAuthHeader(token)
  );
};
