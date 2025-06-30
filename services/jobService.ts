import api from "./api"

// Obtener lista de trabajos (categorías)
export const fetchJobCategories = async () => {
    try {
        const response = await api.get('/api/jobs');
        return response.data;
    } catch (error) {
        console.error(error);
        return [];
    }
};