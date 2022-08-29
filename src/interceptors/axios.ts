import axios from "axios";

axios.defaults.baseURL = "http://localhost:8000/api/";

let refresh: Boolean = false;

axios.interceptors.response.use(response => response, async error => {
    if (error.response.status === 401 && !refresh) {
        refresh = true;

        const { data, status } = await axios.post("refresh", {}, { withCredentials: true });
    
        if (status === 200) {
            axios.defaults.headers.common["Authorization"] = `Bearer ${data.token}`;

            return axios(error.config);
        }
    }

    refresh = false;
    return error;
});
