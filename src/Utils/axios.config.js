import axios from "axios";

// AXIOS CONFIG INSTANCE
const GlobalAPI = axios.create({
    baseURL: process.env.REACT_APP_BASE_API_URL,
    timeout: 20000,
    headers: {
        'Accept': 'application/json',
    }
});

export default GlobalAPI;
