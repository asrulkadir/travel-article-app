import axios, { AxiosError } from 'axios';
import Cookies from 'js-cookie';

const axiosApp = axios.create({
  baseURL: import.meta.env.VITE_URL_API as string
});

// Add a request interceptor
axiosApp.interceptors.request.use(
  (config) => {
    // Exclude auth endpoints
    if (!config.url?.includes('auth')) {
      const token = Cookies.get('auth-test');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error) => {
    const axiosError = error as AxiosError;
    return Promise.reject(new Error(axiosError.message || "An unexpected error occurred"));
  }
);

export const handleAxiosError = (error: unknown): never => {
  if (axios.isAxiosError(error)) {
    const axiosError = error as AxiosError<{ error: { message: string } }>;
    throw new Error(axiosError.response?.data.error.message ?? "An unexpected error occurred");
  } else {
    throw new Error("An unexpected error occurred");
  }
};

export default axiosApp;