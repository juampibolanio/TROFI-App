import api from './api'

//solicitud para traer los datos de un usuario por su email.
export const userProfileRequest = async (email: string) => {

    const encodedEmail = encodeURIComponent(email);

    const response = await api.get(`/user/profile/${encodedEmail}`);
    return response.data;
}