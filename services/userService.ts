import api from './api'

//solicitud para traer los datos de un usuario por su email.
export const userProfileRequest = async (email: string) => {

    const encodedEmail = encodeURIComponent(email);

    const response = await api.get(`/api/user/profile/${encodedEmail}`);
    return response.data;
}

//obtener los datos de un usuario por su ID
export const getUserById = async (id: number) => {
    try {
        const response = await api.get(`/api/user/profile-by-id/${id}`);
        return response.data;
    } catch (error) {
        console.error('Error al obtener el perfil del usuario:', error);
        throw error;
    }
};

//obtener las fotos de un usuario por su ID
export const getUserPhotos = async (id: number): Promise<string[]> => {
    try {
        const response = await api.get(`/api/user/photos/${id}`);
        return response.data;
    } catch (error) {
        console.error('Error al obtener las fotos del usuario:', error);
        return [];
    }
};

// subir foto 
export const uploadPhoto = async (imageUrl: string) => {
    const response = await api.post('/api/user/photos', {
        photoUrl: imageUrl,
    });

    return response.data; //  { id: number, url: string }
};

// eliminar foto
export const deletePhoto = async (photoId: number) => {
    try {
        const response = await api.delete(`/api/user/photos/${photoId}`);
        return response.data;
    } catch (error) {
        console.error("Error al eliminar imagen:", error);
        throw error;
    }
};

// actualizar foto de perfil del usuario
export const updateUserProfileImage = async (imageProfile: string) => {
    const response = await api.put('/api/user/profile-image', { imageProfile });
    return response.data;
};

//solicitud para listar TODOS los trabajadores registrados en la app
export const searchWorkers = async ({
    searchText,
    selectedJobId,
}: {
    searchText: string;
    selectedJobId: number | null;
}) => {
    try {
        const response = await api.get('api/workers/search', {
            params: {
                search: searchText,
                id_job: selectedJobId ?? '',
            },
        });

        if (response.data.success) {
            return response.data.workers;
        }

        return [];
    } catch (error) {
        console.error('Error al buscar trabajadores:', error);
        return [];
    }
};

// Buscar trabajadores por categoría (por nombre del trabajo, ej: "Plomería")
export const getWorkersByCategory = async (categoryName: string) => {
    try {
        const response = await api.get('/api/workers/search', {
            params: { category: categoryName },
        });
        return response.data; // [{ id, fullname, score, image_profile, job_category }]
    } catch (error) {
        console.error('Error al obtener trabajadores por categoría:', error);
        return [];
    }
};

// solicitud para guardar datos de un usuario comun
export const saveUserProfile = async (data: {
    dni: string;
    userDescription: string;
    imageProfile: string;
    location: string;
}) => {
    const response = await api.post('/api/user/profile', data);
    return response.data;
};

//solicitud para guardar datos de un usuario trabajador
export const saveUserWorkerProfile = async (data: {
    dni: string;
    userDescription: string;
    imageProfile: string;
    location: string;
    id_job: number;
    job_description: string;
    job_images: { id: number; url: string }[];
}) => {
    const response = await api.put('/api/user/workerProfile', data);
    return response.data;
};

// actualizar id del oficio
export const updateJob = async (id_job: number) => {
    try {
        const response = await api.put('/api/user/update-job', { id_job });
        console.log(response.data)
        return response.data;
    } catch (error) {
        console.error(error);
        console.log('error al actualizar la id del oficio')
    }
};

// actualizar descripción del trabajo
export const updateJobDescription = async (job_description: string) => {
    try {
        const response = await api.put('/api/user/update-job_description', { job_description });
        return response.data;
    } catch (error) {
        console.error(error);
        console.log('error al actualizar la descripcion del trabajo')
    }
};


// Actualizar nombre
export const updateUserName = async (name: string) => {
    try {
        const response = await api.put('/api/user/update-name', { name });
        return response.data;
    } catch (error) {
        console.error('Error al actualizar el nombre:', error);
        throw error;
    }
};

// Actualizar número de teléfono
export const updatePhoneNumber = async (phoneNumber: string) => {
    try {
        const response = await api.put('/api/user/update-phone', { phoneNumber });
        return response.data;
    } catch (error) {
        console.error('Error al actualizar el número de teléfono:', error);
        throw error;
    }
};

// Actualizar descripción personal
export const updateUserDescription = async (userDescription: string) => {
    try {
        const response = await api.put('/api/user/update-userDescription', { userDescription });
        return response.data;
    } catch (error) {
        console.error('Error al actualizar la descripción personal:', error);
        throw error;
    }
};

// Actualizar ubicación
export const updateLocation = async (location: string) => {
    try {
        const response = await api.put('/api/user/update-location', { location });
        return response.data;
    } catch (error) {
        console.error('Error al actualizar la ubicación:', error);
        throw error;
    }
};
