import api from "./api";

// Obtener lista de trabajos/categorías
export const fetchJobCategories = async () => {
    try {
        const response = await api.get('/jobs/jobs');
        return response.data.data;
    } catch (error) {
        console.error('Error al obtener categorías de trabajo:', error);
        return [];
    }
};