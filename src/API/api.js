import axios from "axios";

const axiosInstance = axios.create();

axiosInstance.interceptors.response.use(
    response => response,
    error => {
        if (error.response && error.response.status === 403 || error.response.status === 401) {
            localStorage.clear()
            window.location.href = "/login";
        }
        return Promise.reject(error);
    }
);

/* This code block is exporting an object with various asynchronous functions that make HTTP requests
using Axios. Here's a breakdown of what each function does: */
export default {
    get: async (URL) => axiosInstance.get(URL),
    delete: async (URL) => axiosInstance.delete(URL),
    post: async (URL, DATA) => axiosInstance.post(URL, DATA),

    getWithToken: async (URL) =>
        axiosInstance.get(URL, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
        }),

    deleteWithToken: async (URL) =>
        axiosInstance.delete(URL, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
        }),
    postWithToken: async (URL, DATA) =>
        axiosInstance.post(URL, DATA, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
        }),


    putWithToken: async (URL, DATA) =>
        axiosInstance.put(URL, DATA, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
        }),

    patchWithToken: async (URL, DATA) =>
        axiosInstance.patch(URL, DATA, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
        }),
};
