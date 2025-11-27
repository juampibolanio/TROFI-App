import api from "./api";

interface LoginResponseData {
    message: string;
    idToken: string;
    refreshToken: string;
    expiresIn: string;
    uid: string;
    email: string;
    profile: any;
}

interface LoginResponse {
    success: boolean;
    message: string | null;
    data: LoginResponseData;
}

interface RegisterResponse {
    success: boolean;
    message: string | null;
    data: {
        user: any;
    };
}

// Login de usuario - retorna idToken de Firebase
export const loginRequest = async (email: string, password: string) => {
    const response = await api.post<LoginResponse>('/auth/login', { email, password });

    const { idToken, uid, email: userEmail, profile } = response.data.data;

    return {
        token: idToken,
        uid,
        email: userEmail,
        user: profile
    };
};

// Registro de usuario normal (no trabajador)
export const registerRequest = async (formData: {
    name: string;
    email: string;
    password: string;
    phoneNumber: string;
}) => {
    const response = await api.post<RegisterResponse>('/auth/register', formData);


    const { user } = response.data.data;

    return {
        user,
    };
};

// Registro de trabajador
export const registerWorkerRequest = async (formData: {
    name: string;
    email: string;
    password: string;
    phoneNumber: string;
    dni?: string;
    location?: string;
    id_job?: number;
    job_description?: string;
    userDescription?: string;
}) => {
    const response = await api.post('/users/worker/register', formData);

    return response.data.data;
};

// Logout - revoca tokens de Firebase
export const logoutRequest = async () => {
    const response = await api.post('/auth/logout');
    return response.data;
};

// Solicitar email de recuperación de contraseña
export const forgotPasswordRequest = async (email: string) => {
    const response = await api.post('/auth/forgot-password', { email });
    return response.data;
};

// Resetear contraseña con código (oobCode)
export const resetPasswordRequest = async (oobCode: string, newPassword: string) => {
    const response = await api.post('/auth/reset-password', { oobCode, newPassword });
    return response.data;
};

// Obtener perfil del usuario autenticado
export const getMeRequest = async () => {
    const response = await api.get('/auth/me');
    return response.data.data;
};
