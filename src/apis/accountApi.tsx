import axios from "axios"
import { BASE_URL_API } from "../utils"
import { IAccountLogin } from "../utils/type";

export const accountApi = {
    login: (payload: IAccountLogin) => {
        return axios.post(`${BASE_URL_API}/login-user`, payload);
    },
    register: (payload: IAccountLogin) => {
        return axios.post(`${BASE_URL_API}/register`, payload);
    }
}