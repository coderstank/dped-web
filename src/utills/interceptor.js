import axios from "axios";
import store from "../app/store";
import { logout, setLoading } from "../reducers/authSlice";
const instance = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
});

// Request interceptor
instance.interceptors.request.use(
  (config) => {
    store.dispatch(setLoading(true));
    // Modify the request config, e.g., add headers
    const token = sessionStorage.getItem("token");
    config.headers["Authorization"] = `Bearer ${token}`;
    config.headers["ngrok-skip-browser-warning"] = "69420";
    return config;
  },
  (error) => {
    // Handle request error
    store.dispatch(setLoading(false));
    return Promise.reject(error);
  }
);

// Response interceptor
instance.interceptors.response.use(
  (response) => {
    // Modify the response data
    store.dispatch(setLoading(false));
    return response.data;
  },
  (error) => {
    // Handle response error
    store.dispatch(setLoading(false));
    if (error.response.data.error.statusCode == 401) {
      store.dispatch(logout());
    }
    return Promise.reject(error.response.data.error);
  }
);

export default instance;
