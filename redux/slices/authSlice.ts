import { removeData } from '@/utils/storage';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AuthState {
    token: string | null; 
    uid: string | null;
    email: string | null;
    isLoggedIn: boolean;
}

const initialState: AuthState = {
    token: null,
    uid: null,
    email: null,
    isLoggedIn: false,
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setCredentials(state, action: PayloadAction<{ 
            token: string; 
            uid: string;
            email: string;
        }>) {
            state.token = action.payload.token; 
            state.uid = action.payload.uid;
            state.email = action.payload.email;
            state.isLoggedIn = true;
        },
        logout(state) {
            state.token = null;
            state.uid = null;
            state.email = null;
            state.isLoggedIn = false;

            // Eliminar datos del AsyncStorage cuando el usuario cierre sesión
            removeData('auth');
            removeData('user');
        },
    },
});

export const { setCredentials, logout } = authSlice.actions;
export default authSlice.reducer;