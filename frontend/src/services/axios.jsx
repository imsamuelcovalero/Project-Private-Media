/* FIle: src/services/axios.jsx */
import axios from 'axios';

/* url base para as requisições */
const api = axios.create({
  withCredentials: true,
  baseURL: 'http://localhost:3001',
});

export default api;
