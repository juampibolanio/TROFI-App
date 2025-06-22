import api from './api'

// peticion al backend para loguear un usuario.
export const loginRequest = async (email: string, password: string) => {
    const response = await api.post('/login', {email, password});
    return response.data;
}

//peticion al backend para registrar un usuario.
export const registerRequest = async (data: {
    fullname: string;
    email: string;
    password: string;
    phoneNumber: string;
}) => {
    const response = await api.post('/register', data);
    return response.data;
}