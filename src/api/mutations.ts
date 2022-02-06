
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

function updateUserData(data: { id: number, firstName: string, lastName: string, email: string, status: number }) {
    return axios.patch(`/users/${data.id}`, { 'firstName': data.firstName, 'lastName': data.lastName, 'email': data.email, 'status': data.status });
}


function updateUserPermission(data: { id: number, permissionId: number }) {
    return axios.patch(`/users/${data.id}`, { 'permissionId': data.permissionId });
}

const exports = {
    register,
    login,
    updateUserData,
    updateUserPermission
};
export default exports;
