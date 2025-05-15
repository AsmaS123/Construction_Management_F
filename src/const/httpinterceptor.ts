import axios from "axios";

const axiosInstance = axios.create({
  // baseURL: "http://34.203.80.36:5003/api/",
  baseURL: "http://localhost:5003/api/",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
  // other configurations
});

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      console.log("call the refresh token api here");
      // Handle 401 error, e.g., redirect to login or refresh token
    } else {
      alert(error);
    }
    return Promise.reject(error);
  },
);

axiosInstance.interceptors.request.use(
  async (config) => {
    // debugger
    // Retrieve JWT token from local storage
    const temp: any = localStorage.getItem("loginData");
    const loginData = JSON.parse(temp);
    const token = loginData && loginData.token;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

export default axiosInstance;
