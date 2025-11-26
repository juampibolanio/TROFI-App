import { useEffect, useState } from "react";
import {
    View,
    Text,
    SafeAreaView,
    StyleSheet,
    Image,
    TextInput,
    ScrollView,
    Pressable,
    ImageBackground,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import { moderateScale, verticalScale } from "react-native-size-matters";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import RNPickerSelect from "react-native-picker-select";
import imagePath from "@/constants/imagePath";
import fonts from "@/constants/fonts";
import { useFonts } from "@expo-google-fonts/roboto";
import { setUserProfile } from "@/redux/slices/userSlice";
import { storeData } from "@/utils/storage";
import { router } from "expo-router";
import { saveUserWorkerProfile } from "@/services/userService";
import { fetchJobCategories } from "@/services/jobService";
import { uploadProfileImage } from "@/services/imageService";
import CustomAlert from "@/components/atoms/CustomAlert";

const CompleteJobProfile = () => {
    const dispatch = useDispatch();
    const user = useSelector((state: RootState) => state.user);
    const [fontsLoaded] = useFonts(fonts);

    const [idJob, setIdJob] = useState<number | null>(null);
    const [jobDescription, setJobDescription] = useState("");
    const [jobImages, setJobImages] = useState<string[]>([]);
    const [jobs, setJobs] = useState<{ id: number; name: string }[]>([]);
    const [isLoading, setIsLoading] = useState(false);

    // Estados para los CustomAlert
    const [alertConfig, setAlertConfig] = useState({
        visible: false,
        type: 'info' as 'success' | 'error' | 'warning' | 'info',
        title: '',
        message: '',
        showCancel: false,
        confirmText: 'Aceptar',
        cancelText: 'Cancelar',
        onConfirm: () => { },
        onCancel: undefined as (() => void) | undefined
    });

    // Función para mostrar alertas
    const showAlert = (config: Partial<typeof alertConfig>) => {
        setAlertConfig({
            visible: true,
            type: 'info',
            title: '',
            message: '',
            showCancel: false,
            confirmText: 'Aceptar',
            cancelText: 'Cancelar',
            onConfirm: () => setAlertConfig(prev => ({ ...prev, visible: false })),
            onCancel: undefined,
            ...config
        });
    };

    useEffect(() => {
        const fetchJobs = async () => {
            try {
                const jobs = await fetchJobCategories();
                setJobs(jobs);

                if (jobs.length === 0) {
                    showAlert({
                        type: 'warning',
                        title: 'Sin categorías',
                        message: 'No se pudieron cargar las categorías de trabajo. Verifique su conexión a internet.'
                    });
                }
            } catch (e) {
                console.error("Error cargando los trabajos", e);
                setJobs([]);
                showAlert({
                    type: 'error',
                    title: 'Error de conexión',
                    message: 'No se pudieron cargar las categorías de trabajo. Inténtelo nuevamente.'
                });
            }
        };
        fetchJobs();
    }, []);

    const handleSelectImage = async () => {
        // Verificar límite de imágenes
        if (jobImages.length >= 5) {
            showAlert({
                type: 'warning',
                title: 'Límite alcanzado',
                message: 'Puede agregar máximo 5 imágenes de sus trabajos. Al completar el registro puede agregar más.'
            });
            return;
        }

        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        if (!result.canceled && result.assets.length > 0) {
            setIsLoading(true);
            try {
                const localUri = result.assets[0].uri;
                const uploadedUrl = await uploadProfileImage(localUri);
                setJobImages((prev) => [...prev, uploadedUrl]);
            } catch (error) {
                console.error('Error subiendo imagen:', error);
                showAlert({
                    type: 'error',
                    title: 'Error al cargar imagen',
                    message: 'No se pudo subir la imagen. Verifique su conexión e inténtelo nuevamente.'
                });
            } finally {
                setIsLoading(false);
            }
        }
    };

    const handleRemoveImage = (index: number) => {
        showAlert({
            type: 'warning',
            title: 'Eliminar imagen',
            message: '¿Está seguro de que desea eliminar esta imagen de su galería?',
            showCancel: true,
            confirmText: 'Sí, eliminar',
            cancelText: 'Cancelar',
            onConfirm: () => {
                setJobImages((prev) => prev.filter((_, i) => i !== index));
                showAlert({
                    type: 'info',
                    title: 'Imagen eliminada',
                    message: 'La imagen fue eliminada de su galería'
                });
            },
            onCancel: () => setAlertConfig(prev => ({ ...prev, visible: false }))
        });
    };

    const validateForm = () => {
        if (!idJob) {
            showAlert({
                type: 'warning',
                title: 'Oficio requerido',
                message: 'Por favor seleccione un oficio para continuar.'
            });
            return false;
        }

        if (!jobDescription.trim()) {
            showAlert({
                type: 'warning',
                title: 'Descripción requerida',
                message: 'Por favor agregue una descripción de su experiencia laboral.'
            });
            return false;
        }

        if (jobDescription.trim().length < 30) {
            showAlert({
                type: 'warning',
                title: 'Descripción muy corta',
                message: 'La descripción debe tener al menos 30 caracteres para ser más descriptiva.'
            });
            return false;
        }

        if (jobImages.length === 0) {
            showAlert({
                type: 'warning',
                title: 'Imágenes requeridas',
                message: 'Agregue al menos una imagen de sus trabajos para mostrar su experiencia.'
            });
            return false;
        }

        return true;
    };

    const handleSaveJobProfile = async () => {
        if (!validateForm()) return;

        // Obtener UID del usuario
        const uid = user.uid;
        
        if (!uid) {
            showAlert({
                type: 'error',
                title: 'Error de sesión',
                message: 'No se pudo identificar al usuario. Por favor, inicia sesión nuevamente.'
            });
            return;
        }

        // Mostrar confirmación antes de guardar
        showAlert({
            type: 'info',
            title: 'Finalizar perfil',
            message: '¿Está seguro de que desea finalizar su perfil laboral? Después de esto será visible como trabajador.',
            showCancel: true,
            confirmText: 'Sí, finalizar',
            cancelText: 'Revisar',
            onConfirm: async () => {
                setIsLoading(true);
                try {
                    // Objeto para enviar al backend
                    const apiPayload = {
                        dni: user.dni ?? "",
                        userDescription: user.userDescription ?? "",
                        imageProfile: user.imageProfile ?? "",
                        location: user.location ?? "",
                        id_job: idJob as number,
                        job_description: jobDescription,
                        job_images: jobImages.map((uri, index) => ({
                            id: index,
                            url: uri,
                        })),
                        is_worker: true,
                    };

                    // Enviar al backend con UID
                    await saveUserWorkerProfile(uid, apiPayload);

                    // Objeto para guardar en Redux y AsyncStorage
                    const workerProfileData = {
                        uid: user.uid,
                        name: user.name,
                        email: user.email,
                        phoneNumber: user.phoneNumber,
                        dni: user.dni ?? "",
                        userDescription: user.userDescription ?? "",
                        imageProfile: user.imageProfile ?? "",
                        location: user.location ?? "",
                        id_job: idJob,
                        job_description: jobDescription,
                        job_images: jobImages.map((uri, index) => ({
                            id: index,
                            url: uri,
                        })),
                        is_worker: true,
                    };

                    dispatch(setUserProfile(workerProfileData));
                    await storeData("user", workerProfileData);

                    // Mostrar mensaje de éxito
                    showAlert({
                        type: 'success',
                        title: '¡Perfil completado!',
                        message: '¡Felicitaciones! Su perfil laboral está completo. Ahora es visible como trabajador.',
                        confirmText: 'Continuar',
                        onConfirm: () => {
                            setAlertConfig(prev => ({ ...prev, visible: false }));
                            router.replace("/(main)/(tabs)/featured");
                        }
                    });

                } catch (error: any) {
                    console.error('Error guardando perfil:', error);
                    const errorMessage = error?.response?.data?.message || 
                        'No se pudo guardar el perfil laboral. Verifique su conexión e inténtelo nuevamente.';
                    
                    showAlert({
                        type: 'error',
                        title: 'Error al guardar',
                        message: errorMessage
                    });
                } finally {
                    setIsLoading(false);
                }
            },
            onCancel: () => setAlertConfig(prev => ({ ...prev, visible: false }))
        });
    };

    return (
        <SafeAreaView style={styles.container}>
            <ImageBackground source={imagePath.backgroundOnBoarding} style={styles.overlay} resizeMode="cover">
                <ScrollView contentContainerStyle={styles.scrollContainer} keyboardShouldPersistTaps="handled">
                    <View style={styles.header}>
                        <Image source={imagePath.icon} style={styles.icon} resizeMode="contain" />
                        <Text style={styles.title}>Detalles del trabajo</Text>
                        <Text style={styles.description}>
                            Seleccioná tu oficio y agregá una descripción breve de tu experiencia. También podés subir imágenes de tus trabajos.
                        </Text>
                    </View>

                    <View style={styles.body}>
                        {/* SELECT OFICIO */}
                        <View style={styles.fieldContainer}>
                            <RNPickerSelect
                                placeholder={{ label: "Seleccione un oficio", value: null }}
                                onValueChange={(value) => setIdJob(value)}
                                items={jobs.map((job) => ({
                                    label: job.name,
                                    value: job.id,
                                }))}
                                value={idJob}
                                style={pickerSelectStyles}
                                useNativeAndroidPickerStyle={false}
                                Icon={() => <Ionicons name="chevron-down" size={20} color="#fff" style={{ marginRight: 10 }} />}
                            />
                            <View style={styles.underline} />
                        </View>

                        {/* DESCRIPCIÓN */}
                        <View style={styles.fieldContainer}>
                            <View style={styles.inputWrapper}>
                                <TextInput
                                    value={jobDescription}
                                    onChangeText={setJobDescription}
                                    placeholder="Describí brevemente tu experiencia laboral"
                                    placeholderTextColor="#ccc"
                                    multiline
                                    numberOfLines={4}
                                    maxLength={500}
                                    style={[styles.input, { minHeight: verticalScale(60), textAlignVertical: "top" }]}
                                />
                                {jobDescription.length > 0 && (
                                    <Pressable onPress={() => setJobDescription("")} style={styles.iconButton}>
                                        <Ionicons name="close" size={20} color="#fff" />
                                    </Pressable>
                                )}
                            </View>
                            <View style={styles.underline} />
                            {jobDescription.length > 0 && (
                                <Text style={styles.characterCount}>
                                    {jobDescription.length}/500 caracteres
                                </Text>
                            )}
                        </View>

                        {/* IMÁGENES */}
                        <View style={styles.fieldContainer}>
                            <View style={styles.imageHeader}>
                                <Pressable
                                    style={[styles.buttonSecondary, isLoading && styles.disabledButton]}
                                    onPress={handleSelectImage}
                                    disabled={isLoading}
                                >
                                    <Text style={styles.buttonText}>
                                        {isLoading ? 'Cargando...' : 'Agregar imagen'}
                                    </Text>
                                </Pressable>
                                <Text style={styles.imageCount}>
                                    {jobImages.length}/5 imágenes
                                </Text>
                            </View>

                            {jobImages.length > 0 && (
                                <View style={styles.imagesContainer}>
                                    {jobImages.map((uri, index) => (
                                        <View key={index} style={styles.imageItem}>
                                            <Image source={{ uri }} style={styles.jobImage} />
                                            <Pressable
                                                style={styles.closeIcon}
                                                onPress={() => handleRemoveImage(index)}
                                            >
                                                <Ionicons name="close-circle" size={20} color="#f00" />
                                            </Pressable>
                                        </View>
                                    ))}
                                </View>
                            )}
                        </View>
                    </View>

                    <View style={styles.footer}>
                        <Pressable
                            style={[styles.button, isLoading && styles.disabledButton]}
                            onPress={handleSaveJobProfile}
                            disabled={isLoading}
                        >
                            <Text style={styles.buttonText}>
                                {isLoading ? 'Guardando...' : 'Finalizar'}
                            </Text>
                        </Pressable>
                    </View>
                </ScrollView>
            </ImageBackground>

            {/* Configuro el custom alert */}
            <CustomAlert
                visible={alertConfig.visible}
                type={alertConfig.type}
                title={alertConfig.title}
                message={alertConfig.message}
                showCancel={alertConfig.showCancel}
                confirmText={alertConfig.confirmText}
                cancelText={alertConfig.cancelText}
                onConfirm={alertConfig.onConfirm}
                onCancel={alertConfig.onCancel}
            />
        </SafeAreaView>
    );
};

export default CompleteJobProfile;

// ----------------- ESTILOS ----------------------

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: "#0E3549" },
    overlay: { flex: 1 },
    scrollContainer: {
        flexGrow: 1,
        paddingHorizontal: moderateScale(20),
        paddingVertical: moderateScale(20),
        gap: moderateScale(20),
    },
    header: { marginBottom: verticalScale(20) },
    icon: {
        width: moderateScale(50),
        height: moderateScale(50),
        alignSelf: "center",
        marginBottom: moderateScale(10),
    },
    title: {
        fontSize: moderateScale(24),
        fontWeight: "bold",
        color: "#ffffff",
        textAlign: "center",
        marginBottom: moderateScale(10),
    },
    description: {
        fontSize: moderateScale(14),
        color: "#ffffff",
        textAlign: "left",
    },
    body: {
        flex: 1,
        alignItems: "center",
    },
    fieldContainer: {
        width: "100%",
        marginBottom: moderateScale(20),
    },
    inputWrapper: {
        flexDirection: "row",
        alignItems: "center",
    },
    input: {
        flex: 1,
        color: "#fff",
        backgroundColor: "transparent",
        paddingVertical: 6,
        fontSize: 14,
    },
    iconButton: {
        padding: 6,
        marginLeft: 4,
    },
    underline: {
        height: 1.5,
        backgroundColor: "#888",
        width: "100%",
        marginTop: 2,
    },
    characterCount: {
        color: '#ccc',
        fontSize: moderateScale(12),
        textAlign: 'right',
        marginTop: moderateScale(4),
    },
    imageHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: moderateScale(10),
    },
    imageCount: {
        color: '#ccc',
        fontSize: moderateScale(12),
    },
    imagesContainer: {
        flexDirection: "row",
        flexWrap: "wrap",
        gap: moderateScale(10),
    },
    imageItem: {
        position: "relative",
    },
    jobImage: {
        width: moderateScale(100),
        height: moderateScale(100),
        borderRadius: moderateScale(10),
        borderWidth: 1,
        borderColor: "#ccc",
    },
    closeIcon: {
        position: "absolute",
        top: -6,
        right: -6,
        backgroundColor: "#fff",
        borderRadius: 10,
    },
    footer: {
        marginTop: verticalScale(10),
    },
    button: {
        backgroundColor: "#D9D9D9",
        padding: moderateScale(15),
        paddingHorizontal: moderateScale(35),
        borderRadius: moderateScale(20),
        alignSelf: "center",
        marginBottom: moderateScale(10),
    },
    buttonSecondary: {
        backgroundColor: "#D9D9D9",
        padding: moderateScale(10),
        paddingHorizontal: moderateScale(20),
        borderRadius: moderateScale(12),
    },
    disabledButton: {
        opacity: 0.6,
    },
    buttonText: {
        color: "#000000",
        textAlign: "center",
        fontWeight: "bold",
        fontSize: moderateScale(13),
    },
});

const pickerSelectStyles = StyleSheet.create({
    inputIOS: {
        color: "#fff",
        paddingVertical: 6,
        fontSize: 14,
        paddingRight: 30,
    },
    inputAndroid: {
        color: "#fff",
        paddingVertical: 6,
        fontSize: 14,
        paddingRight: 30,
    },
    placeholder: {
        color: "#ccc",
    },
});