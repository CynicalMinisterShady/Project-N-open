// frontend/lib/axiosClient.js
import axios from 'axios';

const base = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080';

const axiosClient = axios.create({
  baseURL: base,
  withCredentials: true,
  headers: { 'Content-Type': 'application/json' }
});

export default axiosClient;
