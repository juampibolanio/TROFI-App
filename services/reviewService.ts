import api from './api';

/* ================================
   CREAR Y GESTIONAR RESEÑAS
================================ */

/**
 * Crea una nueva reseña
 * @param reviewed_id - UID del usuario reseñado
 * @param description - Descripción de la reseña
 * @param score - Puntuación (1-5)
 */
export const createReview = async (
    reviewed_id: string,
    description: string,
    score: number
) => {
    try {
        const response = await api.post('/reviews', {
            reviewed_id,
            description,
            score,
        });
        return response.data;
    } catch (err) {
        console.error('Error al crear reseña:', err);
        throw err;
    }
};

/**
 * Actualiza una reseña existente
 * @param reviewId - ID de la reseña
 * @param description - Nueva descripción (opcional)
 * @param score - Nuevo score (opcional)
 */
export const updateReview = async (
    reviewId: string,
    description?: string,
    score?: number
) => {
    try {
        const response = await api.put(`/reviews/${reviewId}`, {
            description,
            score,
        });
        return response.data;
    } catch (err) {
        console.error('Error al actualizar reseña:', err);
        throw err;
    }
};

/**
 * Elimina una reseña
 * @param reviewId - ID de la reseña
 */
export const deleteReview = async (reviewId: string) => {
    try {
        const response = await api.delete(`/reviews/${reviewId}`);
        return response.data;
    } catch (err) {
        console.error('Error al eliminar reseña:', err);
        throw err;
    }
};

/* ================================
   OBTENER RESEÑAS
================================ */

/**
 * Obtiene todas las reseñas recibidas por un usuario
 * @param userId - UID del usuario
 */
export const getUserReviews = async (userId: string) => {
    try {
        const response = await api.get(`/reviews/user/${userId}`);
        return response.data.data.reviews;
    } catch (err) {
        console.error('Error al obtener reseñas del usuario:', err);
        return [];
    }
};

/**
 * Obtiene todas las reseñas hechas por un usuario (reviewer)
 * @param reviewerId - UID del reviewer
 */
export const getReviewsByReviewer = async (reviewerId: string) => {
    try {
        const response = await api.get(`/reviews/reviewer/${reviewerId}`);
        return response.data.data.reviews;
    } catch (err) {
        console.error('Error al obtener reseñas del reviewer:', err);
        return [];
    }
};

/**
 * Obtiene una reseña específica
 * @param reviewId - ID de la reseña
 */
export const getReviewById = async (reviewId: string) => {
    try {
        const response = await api.get(`/reviews/${reviewId}`);
        return response.data.data.review;
    } catch (err) {
        console.error('Error al obtener reseña:', err);
        throw err;
    }
};

/**
 * Obtiene el promedio de puntuación y total de reseñas de un usuario
 * @param userId - UID del usuario
 */
export const getUserAverageScore = async (userId: string) => {
    try {
        const response = await api.get(`/reviews/user/${userId}/average`);
        return response.data.data;
    } catch (err) {
        console.error('Error al obtener promedio de usuario:', err);
        return {
            averageScore: 0,
            totalReviews: 0,
        };
    }
};