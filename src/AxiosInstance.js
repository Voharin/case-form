import axios from "axios";

const instance = axios.create({
    baseURL: "https://caseform.localhost",
    headers: {
        "Content-Type": "application/json",
        "X-Requested-With": "XMLHttpRequest",
    },
});

export default instance;