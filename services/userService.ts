import api from './api';

/* ================================
   PERFIL
================================ */

// Obtener perfil por email
export const userProfileRequest = async (email: string) => {
  const encoded = encodeURIComponent(email);
  const res = await api.get(`/users/profile/email/${encoded}`);
  return res.data;
};

// Obtener perfil por UID
export const getUserByUid = async (uid: string) => {
  try {
    const res = await api.get(`/users/profile/uid/${uid}`);
    return res.data;
  } catch (err) {
    console.error('Error al obtener el perfil del usuario:', err);
    throw err;
  }
};

// Obtener perfil del usuario autenticado
export const getMeRequest = async () => {
  try {
    const res = await api.get('/users/me');
    return res.data;
  } catch (err) {
    console.error('Error al obtener perfil propio:', err);
    throw err;
  }
};

/* ================================
   FOTOS DE TRABAJO
================================ */

// Obtener fotos (solo URLs)
export const getUserPhotos = async (uid: string): Promise<string[]> => {
  try {
    const res = await api.get(`/users/photos/${uid}`);
    return res.data;
  } catch (err) {
    console.error('Error al obtener las fotos del usuario:', err);
    return [];
  }
};

// Subir foto a job_images
export const uploadPhoto = async (uid: string, imageUrl: string) => {
  const res = await api.post(`/users/photos/${uid}`, { photoUrl: imageUrl });
  return res.data;
};

// Eliminar foto
export const deletePhoto = async (uid: string, photoId: number) => {
  try {
    const res = await api.delete(`/users/photos/${uid}`, { data: { id: photoId } });
    return res.data;
  } catch (err) {
    console.error('Error al eliminar imagen:', err);
    throw err;
  }
};

/* ================================
   FOTO DE PERFIL
================================ */

export const updateUserProfileImage = async (uid: string, imageProfile: string) => {
  const res = await api.put(`/users/profile-photo/${uid}`, { uid, imageProfile });
  return res.data;
};

/* ================================
   TRABAJADORES
================================ */

// Obtener todos los trabajadores
export const getAllWorkers = async () => {
  try {
    const res = await api.get('/users/workers');
    return res.data?.trabajadores ?? [];
  } catch (err) {
    console.error('Error al obtener trabajadores:', err);
    return [];
  }
};

// Buscar trabajadores
export const searchWorkers = async ({
  searchText,
  selectedJobId,
}: {
  searchText: string;
  selectedJobId: number | null;
}) => {
  try {
    const res = await api.get('/users/workers/search', {
      params: {
        search: searchText,
        id_job: selectedJobId ?? '',
      },
    });

    return res.data?.workers ?? [];
  } catch (err) {
    console.error('Error al buscar trabajadores:', err);
    return [];
  }
};

/* ================================
   ACTUALIZACIONES DE PERFIL
================================ */

// Perfil básico
export const updateUserProfile = async (
  uid: string,
  data: {
    dni?: string;
    userDescription?: string;
    imageProfile?: string;
    location?: string;
    phoneNumber?: string;
    name?: string;
  }
) => {
  const res = await api.put(`/users/update/${uid}`, { uid, ...data });
  return res.data;
};

// Perfil completo de worker
export const saveUserWorkerProfile = async (
  uid: string,
  data: {
    dni?: string;
    userDescription?: string;
    imageProfile?: string;
    location?: string;
    is_worker?: boolean;
    id_job?: number;
    job_description?: string;
    job_images?: { id: number; url: string }[];
  }
) => {
  const res = await api.put(`/users/worker/update/${uid}`, { uid, ...data });
  return res.data;
};

// Nombre
export const updateUserName = async (uid: string, name: string) => {
  try {
    const res = await api.put(`/users/update/name/${uid}`, { uid, name });
    return res.data;
  } catch (err) {
    console.error('Error al actualizar el nombre:', err);
    throw err;
  }
};

// Teléfono
export const updatePhoneNumber = async (uid: string, phone: string) => {
  try {
    const res = await api.put(`/users/update/phone/${uid}`, { uid, phone });
    return res.data;
  } catch (err) {
    console.error('Error al actualizar el número de teléfono:', err);
    throw err;
  }
};

// Descripción personal
export const updateUserDescription = async (uid: string, userDescription: string) => {
  try {
    const res = await api.put(`/users/update/user-description/${uid}`, { uid, userDescription });
    return res.data;
  } catch (err) {
    console.error('Error al actualizar la descripción personal:', err);
    throw err;
  }
};

// Ubicación
export const updateLocation = async (uid: string, location: string) => {
  try {
    const res = await api.put(`/users/update/location/${uid}`, { uid, location });
    return res.data;
  } catch (err) {
    console.error('Error al actualizar la ubicación:', err);
    throw err;
  }
};

// Descripción del trabajo
export const updateJobDescription = async (uid: string, job_description: string) => {
  try {
    const res = await api.put(`/users/update/job-description/${uid}`, { uid, job_description });
    return res.data;
  } catch (err) {
    console.error('Error al actualizar la descripción del trabajo:', err);
    throw err;
  }
};

// Oficio
export const updateJob = async (uid: string, id_job: number) => {
  try {
    const res = await api.put(`/users/worker/update/${uid}`, { uid, id_job });
    return res.data;
  } catch (err) {
    console.error('Error al actualizar oficio:', err);
    throw err;
  }
};
