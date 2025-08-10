import axios from 'axios';

export const axiosInstance = axios.create({});

export const apiConnector = (method, url, key) => {
    return axiosInstance({
        method: method,
        url: url,
        data: key ? key : null,
    });
};   