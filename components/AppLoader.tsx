import { setCredentials } from "@/redux/slices/authSlice";
import { setUserProfile } from "@/redux/slices/userSlice";
import { userProfileRequest } from "@/services/userService";
import { getData, storeData } from "@/utils/storage";
import { SplashScreen, Redirect } from "expo-router";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";

const AppLoader = () => {

    const [isLoading, setIsLoading] = useState(true);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const dispatch = useDispatch();

    //Función para mapear imágenes. Para que solo devuelva id : url
    function normalizeJobImages(images: any[]): { id: number, url: string }[] {
        return images.map((img: any, index: number) => {
            if (typeof img === 'string') {
                return { id: index, url: img };
            }
            if (typeof img === 'object' && img !== null) {
                if (typeof img.url === 'string') {
                    return { id: Number(img.id ?? index), url: img.url };
                }
            }
            return { id: index, url: '' };
        });
    }

    //obtener datos del storage para verificar si hay sesión
    useEffect(() => {
        const prepare = async () => {
            try {
                await SplashScreen.hideAsync();

                const tokenData = await getData('auth');

                if (tokenData?.token && tokenData?.email) {
                    dispatch(setCredentials(tokenData));

                    // Traer perfil desde el backend
                    const apiUser = await userProfileRequest(tokenData.email);

                    // Mapeo la response del backend para usarlo en redux
                    const formattedUser = {
                        ...apiUser,
                        isWorker: apiUser.is_worker === 1,
                        jobId: apiUser.id_job,
                        jobDescripction: apiUser.job_description,
                        jobImages: normalizeJobImages(apiUser.job_images || [])
                    };
                    //seteo datos en redux y asyncstorage
                    dispatch(setUserProfile(formattedUser));
                    await storeData("user", formattedUser);

                    setIsLoggedIn(true);
                }

            } catch (e) {
                console.log('Hubo un error.', e);
            } finally {
                setIsLoading(false);
            }
        };

        prepare();
    }, []);

    if (isLoading) return null;

    return isLoggedIn
        ? <Redirect href="/(main)/(tabs)/featured" />
        : <Redirect href="/(main)/(auth)" />;
};

export default AppLoader;