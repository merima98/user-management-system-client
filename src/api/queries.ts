import axios from "../httpClient";

function getUsers(condition: string, order: string, pageSize: number) {
    return axios.get(`/users?_sort=${condition}&_order=${order}&_limit=${pageSize}`);
}


const exports = {
    getUsers
};
export default exports;