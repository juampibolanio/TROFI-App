import { storeData } from "@/utils/storage";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Photo {
    id: number;
    url: string;
}

interface UserProfile {
    uid: string | null; // Firebase usa UID en lugar de ID numérico
    name: string | null;
    email: string | null;
    userDescription: string | null;
    imageProfile: string | null;
    phoneNumber: string | null;
    dni: string | null;
    location: string | null;

    is_worker: boolean | null; // Cambiado de isWorker a is_worker para coincidir con backend
    id_job: number | null; // Cambiado de jobId
    job_description: string | null; // Cambiado de jobDescripction
    job_images: Photo[] | null; // Cambiado de jobImages

    isProfileComplete?: boolean;
    isWorkerProfileComplete?: boolean;
}

const initialState: UserProfile = {
    uid: null,
    name: null,
    email: null,
    userDescription: null,
    imageProfile: null,
    phoneNumber: null,
    dni: null,
    location: null,

    is_worker: false,
    id_job: null,
    job_description: null,
    job_images: [],

    isProfileComplete: false,
    isWorkerProfileComplete: false,
};

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setUserProfile(state, action: PayloadAction<Partial<UserProfile>>) {
            const newState = { ...state, ...action.payload };

            // Validación de perfil básico completo
            const isProfileComplete =
                !!newState.userDescription &&
                !!newState.imageProfile &&
                !!newState.dni &&
                !!newState.location;

            // Validación de perfil de trabajador
            const isWorkerProfileComplete =
                !!newState.id_job &&
                !!newState.job_description &&
                Array.isArray(newState.job_images) &&
                newState.job_images.length > 0;

            return {
                ...newState,
                isProfileComplete,
                isWorkerProfileComplete,
            };
        },
        clearUserProfile() {
            return initialState;
        },
        addUserPhoto(state, action: PayloadAction<Photo>) {
            const newPhoto = {
                id: action.payload.id,
                url: typeof action.payload.url === 'string' ? action.payload.url : '',
            };

            const updatedPhotos = [...(state.job_images || []), newPhoto];
            state.job_images = updatedPhotos;
            storeData('userPhotos', updatedPhotos);
        },
        removeUserPhoto(state, action: PayloadAction<number>) {
            const updatedPhotos = (state.job_images || []).filter(
                (photo) => photo.id !== action.payload
            );
            state.job_images = updatedPhotos;
            storeData('userPhotos', updatedPhotos);
        },
        setImageProfile(state, action: PayloadAction<string>) {
            state.imageProfile = action.payload;
            storeData('userProfileImage', action.payload);
        }
    },
});

export const { 
    setUserProfile, 
    clearUserProfile, 
    addUserPhoto, 
    removeUserPhoto, 
    setImageProfile 
} = userSlice.actions;

export default userSlice.reducer;