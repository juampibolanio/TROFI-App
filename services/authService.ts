import api from './api';

// Petición al backend para loguear un usuario.
export const loginRequest = async (email: string, password: string) => {
    const response = await api.post('/api/login', {
        email,
        password
    });

    const { access_token, user } = response.data;

    return {
        token: access_token,
        user
    };
};

// Petición al backend para registrar un usuario.
export const registerRequest = async (formData: {
    name: string;
    email: string;
    password: string;
    phoneNumber: string;
}) => {
    const response = await api.post('/api/register', formData);

    console.log(response);
    const { access_token, data } = response.data;

    return {
        token: access_token,
        user: data,
    };
};

//petición al backend para hacer logout
export const logoutRequest = async () => {
    try {
        const response = await api.get('/api/logout');
        console.log(response)
    } catch (e) {
        console.error(e)
    }
};

//peticion para recuperar contraseña
export const resetPassword = async ({
    email,
    token,
    password,
    password_confirmation,
}: {
    email: string;
    token: string;
    password: string;
    password_confirmation: string;
}) => {
    const response = await api.post('/api/reset-password', {
        email,
        token,
        password,
        password_confirmation,
    });
    return response.data;
};