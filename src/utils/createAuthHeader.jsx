import axios from "axios";

const createAuthHeader = (token) => ({
  headers: {
    Authorization: `Bearer ${token}`,
  },
});

export default createAuthHeader;
