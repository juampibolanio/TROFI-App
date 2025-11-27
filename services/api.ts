import axios from 'axios';
import { store } from '../redux/store';

// URL base
const API_BASE_URL = 'http://10.0.2.2:5001/trofi-app-4e947/us-central1';

const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    },
});

// Interceptor para agregar el token de Firebase en cada petición
api.interceptors.request.use((config) => {
    const state = store.getState();
    const token = state.auth.token; 

    if (token && config.headers) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
}, (error) => {
    return Promise.reject(error);
});

// Interceptor para manejar errores de respuesta
api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            console.log('Token inválido o expirado');
        }
        return Promise.reject(error);
    }
);

export default api;