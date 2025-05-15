import axios from "axios";
import { toast } from "react-toastify";

const axiosInstance = axios.create({
  // baseURL: "http://34.203.80.36:5003/api/",
  baseURL: "http://localhost:5003/api/",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
  // other configurations
});

axiosInstance.interceptors.response.use(
  (response) => {
    //  debugger;
    // console.log(response);
    // toast.error('Network error. Please check your connection.');
    // if(response.data && response.data.message){
    //   toast.error(response.data.message);
    // }

    return response;
    // return Promise.resolve(response.data?.message);
  },
  (error) => {
    const { response } = error;
    debugger;
    // Handle different error statuses
    if (!response) {
      console.error("Network error");
      toast.error("Network error. Please check your connection.");
    } else {
      if (response.data && response.data.message) {
        toast.error(response.data.message, { position: "top-center" });
      } else {
        switch (response.status) {
          case 401:
            toast.error("Unauthorized. Please log in again.");
            // redirect to login or clear token
            break;
          case 403:
            toast.error("Access denied.");
            break;
          case 404:
            toast.error("Resource not found.", { position: "top-center" });
            break;
          case 500:
            toast.error("Server error. Please try again later.");
            break;
          default:
            toast.error(response.data?.message || "Something went wrong.");
        }
      }
      // console.error('API error:', {
      //   status: response.status,
      //   data: response.data,
      // });
    }

    return Promise.reject(error); // Forward the error to specific handlers if needed
  },
);

axiosInstance.interceptors.request.use(
  async (config) => {
    debugger;
    // debugger
    // Retrieve JWT token from local storage
    // const temp: any = localStorage.getItem("loginData");
    // const loginData = JSON.parse(temp);
    // const token = loginData && loginData.token;
    // if (token) {
    //   config.headers.Authorization = `Bearer ${token}`;
    // }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

export default axiosInstance;
