import axios from "axios";

export const userRegister = (registerData) => {
    return axios.post("http://localhost:8099/api/auth/register", registerData)
}

export const userLogin = (loginData) => {
    return axios.post("http://localhost:8099/api/auth/login", loginData)
}