import axios from 'axios';
import { store } from '../redux/store';

const API_BASE_URL = 'http://192.168.X.X:8000/api'  //aca luego hay que poner la url del backend

//url del backend y encabezado
const api = axios.create({
    baseURL:  API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

//declaro un interceptor para poder agregar el token automat. en cada petición.
api.interceptors.request.use((config) => {
    const state = store.getState();
    const token = state.auth.token;

    if (token && config.headers) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
})

export default api;