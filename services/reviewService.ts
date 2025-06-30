import api from "./api"

export const createReview = async (
    reviewer_id: number,
    reviewed_id: number,
    description: string,
    score: number
) => {
    const response = await api.post('/api/reviews', {
        reviewer_id,    
        reviewed_id,
        description,
        score,
    });

    return response.data;
};

export const getUserReviews = async (userId: number) => {
    try {
        const response = await api.get(`/api/user-reviews/${userId}`);
        return response.data.reviews;
    } catch (e) {
        console.error('Error al listar reviews.', e)
    }
}