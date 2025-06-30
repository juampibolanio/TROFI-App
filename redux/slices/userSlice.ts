import { storeData } from "@/utils/storage";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Photo {
    id: number,
    url: string
}

interface UserProfile {
    id: number | null;
    name: string | null;
    userDescription: string | null;
    imageProfile: string | null;
    phoneNumber: string | null;
    dni: string | null;
    location: string | null;

    isWorker: boolean | null;
    jobId: number | null;
    jobDescripction: string | null;
    score: number | null;
    jobImages: Photo[] | null;

    isProfileComplete?: boolean;
    isWorkerProfileComplete?: boolean;
}

const initialState: UserProfile = {
    id: null,
    name: null,
    userDescription: null,
    imageProfile: null,
    phoneNumber: null,
    dni: null,
    location: null,

    isWorker: false,
    jobId: null,
    jobDescripction: null,
    score: null,
    jobImages: [],

    isProfileComplete: false,
    isWorkerProfileComplete: false,
};

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setUserProfile(state, action: PayloadAction<Partial<UserProfile>>) {
            const newState = { ...state, ...action.payload };

            //Validación de perfil básico completo
            const isProfileComplete =
                !!newState.userDescription &&
                !!newState.imageProfile &&
                !!newState.dni &&
                !!newState.location;

            //Validación de perfil de trabajador
            const isWorkerProfileComplete =
                !!newState.jobId &&
                !!newState.jobDescripction &&
                Array.isArray(newState.jobImages) &&
                newState.jobImages.length > 0;

            return {
                ...newState,
                isProfileComplete,
                isWorkerProfileComplete,
            };
        },
        clearUserProfile() { //eliminar del estado un usuario
            return initialState;
        },
        addUserPhoto(state, action: PayloadAction<Photo>) {
            const newPhoto = {
                id: action.payload.id,
                url: typeof action.payload.url === 'string' ? action.payload.url : '',
            };

            const updatedPhotos = [...(state.jobImages || []), newPhoto];
            state.jobImages = updatedPhotos;
            storeData('userPhotos', updatedPhotos);
        },
        removeUserPhoto(state, action: PayloadAction<number>) { //eliminar foto de la galeria del usuario.
            const updatedPhotos = (state.jobImages || []).filter(
                (photo) => photo.id !== action.payload
            );
            state.jobImages = updatedPhotos;
            storeData('userPhotos', updatedPhotos);
        },
        setImageProfile(state, action: PayloadAction<string>) { //establecer imagen de perfil del usuario
            state.imageProfile = action.payload;
            storeData('userProfileImage', action.payload);
        }

    },
});

export const { setUserProfile, clearUserProfile, addUserPhoto, removeUserPhoto, setImageProfile } = userSlice.actions;
export default userSlice.reducer;