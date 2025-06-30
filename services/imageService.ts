// services/imageService.ts
import axios from 'axios';

//metodo para subir imagen a cloudinary
export const uploadProfileImage = async (imageUri: string): Promise<string> => {
    const data = new FormData();

    data.append('file', {
        uri: imageUri,
        type: 'image/jpeg',
        name: `photo_${Date.now()}.jpg`,
    } as any);

    data.append('upload_preset', 'trofi_unsigned');

    try {
        const response = await axios.post(
            'https://api.cloudinary.com/v1_1/dpxjhrv8s/image/upload',
            data,
            {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            }
        );

        return response.data.secure_url;
    } catch (error: any) {
        console.error('Error al subir imagen:', error.response?.data || error.message);
        throw error;
    }
};