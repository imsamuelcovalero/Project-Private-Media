/* FIle: src/services/axios.jsx */
import axios from 'axios';

const baseURL = process.env.REACT_APP_API_URL || 'http://localhost:3001';

/* url base para as requisições */
const api = axios.create({
  withCredentials: true,
  baseURL,
});

export default api;
