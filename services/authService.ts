import api from "./api";

/**
 * LOGIN
 */
export const loginRequest = async (email: string, password: string) => {
    const response = await api.post("/auth/login", { email, password });

    const {
        idToken,
        profile,
        uid,
        email: userEmail,
        refreshToken,
        expiresIn,
    } = response.data.data;

    return {
        token: idToken,
        refreshToken,
        expiresIn,
        user: {
            uid,
            email: userEmail,
            profile,
        },
    };
};

/**
 * REGISTER
 */
export const registerRequest = async (formData: {
    name: string;
    email: string;
    password: string;
    phoneNumber: string;
}) => {
    const response = await api.post("/auth/register", formData);

    const { user } = response.data.data;

    return {
        user,
    };
};

/**
 * ME
 */
export const meRequest = async () => {
    const response = await api.get("/auth/me");
    return response.data.data.profile;
};

/**
 * LOGOUT
 */
export const logoutRequest = async () => {
    try {
        await api.get("/auth/logout");
    } catch (error) {
        console.error("Logout error:", error);
    }
};

/**
 * FORGOT PASSWORD
 */
export const forgotPasswordRequest = async (email: string) => {
    const response = await api.post("/auth/forgot-password", { email });
    return response.data.data;
};

/**
 * RESET PASSWORD
 */
export const resetPasswordRequest = async (
    oobCode: string,
    newPassword: string
) => {
    const response = await api.post("/auth/reset-password", {
        oobCode,
        newPassword,
    });

    return response.data.data;
};
