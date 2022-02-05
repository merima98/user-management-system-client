
import axios from "../httpClient";

function register(user: {
    firstName: string;
    lastName: string;
    username: string;
    email: string;
    password: string;
    status: number;
    permissionId: number;
}) {
    return axios.post(`/register`, user);
}

const exports = {
    register,
};
export default exports;
