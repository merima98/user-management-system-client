import { FormControlOptions } from "@chakra-ui/react";

import axios from "../httpClient";

function register(credentials: FormControlOptions) {
    return axios.post(`/register`, credentials);
}


const exports = {
    register,
};
export default exports;
