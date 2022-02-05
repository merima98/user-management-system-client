import axios from "../httpClient";

function getUsers(pageSize: number) {
    return axios.get(`/users?_limit=${pageSize}`);
}


const exports = {
    getUsers
};
export default exports;