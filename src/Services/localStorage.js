import axios from "axios";

const api = axios.create({
  baseURL: "https://event-management-backend-gxmo.onrender.com/api/",
});


api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("userToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default api;
