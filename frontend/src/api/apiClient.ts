// apiClient.ts
import axios from 'axios';

const BASE_URL = import.meta.env.VITE_BASE_URL;
// const BASE_URL = "http://172.20.10.3:5000";

const api = axios.create({
  baseURL: BASE_URL,
});

api.interceptors.request.use((config) => {
  const apiKey = localStorage.getItem('api-key');
  if (apiKey) {
    config.headers['x-api-key'] = apiKey;
  }
  // console.log('config', config)
  return config;
});

export default api;
