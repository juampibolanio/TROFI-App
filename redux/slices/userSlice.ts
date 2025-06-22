import { createSlice, PayloadAction } from "@reduxjs/toolkit";


interface UserProfile {
    id: number | null;
    fullname: string | null;
    userDescription: string | null;
    imageProfile: string | null;
    phoneNumber: string | null;
    dni: string | null;

    isWorker: boolean | null;
    jobCategory: string | null;
    jobDescripction: string | null;
    score: number | null;
    jobImages: string[] | null;

    isProfileComplete?: boolean;
    isWorkerProfileComplete?: boolean;
}


const initialState: UserProfile = {
    id: null,
    fullname: null,
    userDescription: null,
    imageProfile: null,
    phoneNumber: null,
    dni: null,

    isWorker: false,
    jobCategory: null,
    jobDescripction: null,
    score: null,
    jobImages: null,

    isProfileComplete: false,
    isWorkerProfileComplete: false,
};
//proximo paso, leer el nombre de usuario desde el perfil del usuario para probar si anda redux como debe ser
const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUserProfile(state, action: PayloadAction<Partial<UserProfile>>) {
            const newState = { ...state, ...action.payload };

            //validacion del perfil basico
            const isProfileComplete =
                !!newState.fullname && !!newState.phoneNumber && !!newState.dni;

            //validacion para ver si tiene perfil de trabajador
            const isWorkerProfileComplete =
                !!newState.jobCategory &&
                !!newState.jobDescripction &&
                Array.isArray(newState.jobImages) &&
                newState.jobImages.length > 0;

            return { 
                ...newState,
                isProfileComplete,
                isWorkerProfileComplete,
            };
        },
        clearUserProfile() {
            return initialState;
        },
    },
});

export const { setUserProfile, clearUserProfile } = userSlice.actions;
export default userSlice.reducer;