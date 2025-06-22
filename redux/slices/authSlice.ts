import { removeData } from '@/utils/storage';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AuthState {
    token: string | null;
    email: string | null;
    isLoggedIn: boolean;
}

//creo el estado inicial de mi slice
const initialState: AuthState = {
    token: null,
    email: null,
    isLoggedIn: false,
};
//NOTA: TENGO QUE SEGUIR HACIENDO EL REGISTER, VALIDACIONES DE CAMPOS, INTEGRACION CON GOOGLE, Y VERIFICAR QUE EL REDUX Y SLICES FUNCIONEN BIEN 
//slice para login y logout de un usuario
const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setCredentials(state, action: PayloadAction<{token: string; email: string }>) {
            state.token = action.payload.token;
            state.email = action.payload.email;
            state.isLoggedIn = true;
        },
        logout(state) {
            state.token = null;
            state.email = null;
            state.isLoggedIn = false;

            //acá elimino los datos del async storage cuando el usuario cierra sesión.
            removeData('auth');
            removeData('user');
        },
    },
});

export const { setCredentials, logout } = authSlice.actions;
export default authSlice.reducer;
