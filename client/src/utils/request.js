import axios from "axios";
import { getToken } from "./token";

const request = axios.create({
    baseURL: "http://localhost:3001", 
    timeout: 5000  
});

request.interceptors.request.use(config => {
    const token = getToken();
    if (token) {
        config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config
}, error => {
    return Promise.reject(error);
});


export default request;


