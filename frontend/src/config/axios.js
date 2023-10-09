import axios from 'axios';
import { BASEURL } from '../Constants/baseUrl';

export const instance = axios.create({
    baseURL: BASEURL
})

instance.interceptors.request.use(config => {
    const token = localStorage.getItem('token');
    config.headers['Authorization'] = 'Bearer '+ token;
    config.headers['Access-Control-Allow-Origin'] = "*";
    return config;
})