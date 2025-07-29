import axios from 'axios';


const url = import.meta.env.VITE_BACKEND_URL;

const axiosInstance = axios.create({
  baseURL: `${url}/api/notes`,
});

axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  console.log('TOKEN BEING SENT:', token);
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export default axiosInstance;
