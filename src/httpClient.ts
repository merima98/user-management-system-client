import axios from "axios";

const instance = axios.create({
    baseURL: "http://localhost:3500",
});

instance.interceptors.request.use(
    function (config) {
        return {
            ...config,
            headers: {
                authorization: localStorage.getItem("token")
            }
        }

    },
    function (error) {
        return Promise.reject(error);
    }
);
instance.interceptors.response.use(
    function (response) {
        return response;
    },
    function (error) {
        if (error.response.status === 401) {
            localStorage.removeItem("token");
        }
        return Promise.reject(error);
    }
);

export default instance;