import axios from 'axios';

// Instancia global de Axios para centralizar la configuración de peticiones
const api = axios.create({
  baseURL: 'https://dummyjson.com',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;