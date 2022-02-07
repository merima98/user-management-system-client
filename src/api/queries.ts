import axios from "../httpClient";

function getUsers(pageSize: number) {
    return axios.get(`/users?_limit=${pageSize}`);
}

function getUserById(userId: number) {
    return axios.get(`/users?id=${userId}`);
}

const exports = {
    getUsers,
    getUserById
};
export default exports;