import { setCredentials } from "@/redux/slices/authSlice";
import { setUserProfile } from "@/redux/slices/userSlice";
import { getUserByUid } from "@/services/userService";
import { getData, storeData } from "@/utils/storage";
import { SplashScreen, Redirect } from "expo-router";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";

const AppLoader = () => {

    const [isLoading, setIsLoading] = useState(true);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const dispatch = useDispatch();

    function normalizeJobImages(images: any[]): { id: number, url: string }[] {
        return images.map((img: any, index: number) => {
            if (typeof img === "string") return { id: index, url: img };
            if (img && typeof img === "object" && typeof img.url === "string")
                return { id: Number(img.id ?? index), url: img.url };
            return { id: index, url: "" };
        });
    }

    useEffect(() => {
        const prepare = async () => {
            try {
                await SplashScreen.hideAsync();

                const tokenData = await getData("auth");

                if (tokenData?.token && tokenData?.email && tokenData?.uid) {
                    dispatch(setCredentials(tokenData));

                    // 🚀 ACA ESTABA EL ERROR
                    const response = await getUserByUid(tokenData.uid);
                    const apiUser = response.data; // 👈 EXTRAEMOS SOLO DATA

                    const formattedUser = {
                        ...apiUser,
                        isWorker: apiUser.is_worker === true || apiUser.is_worker === 1,
                        jobId: apiUser.id_job,
                        jobDescripction: apiUser.job_description,
                        jobImages: normalizeJobImages(apiUser.job_images || [])
                    };

                    dispatch(setUserProfile(formattedUser));
                    await storeData("user", formattedUser);

                    setIsLoggedIn(true);
                }

            } catch (e) {
                console.log("Hubo un error.", e);
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
