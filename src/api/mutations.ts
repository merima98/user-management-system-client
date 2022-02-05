
import { FormControlOptions } from "@chakra-ui/react";
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
function login(credentials: FormControlOptions) {
    return axios.post(`/login`, credentials);
}


const exports = {
    register,
    login
};
export default exports;
