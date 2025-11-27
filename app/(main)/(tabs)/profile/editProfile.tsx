import fonts from '@/constants/fonts';
import imagePath from '@/constants/imagePath';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { useState } from 'react';
import {
    View,
    Text,
    ImageBackground,
    Pressable,
    SafeAreaView,
    StyleSheet,
    Image,
    ScrollView
} from 'react-native';
import { moderateScale } from 'react-native-size-matters';
import ButtonComponent from '@/components/atoms/ButtonComponent';
import CustomAlert from '@/components/atoms/CustomAlert';
import { useFonts } from '@expo-google-fonts/roboto';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/redux/store';
import { logoutRequest } from '@/services/authService';
import { logout } from '@/redux/slices/authSlice';
import { clearUserProfile } from '@/redux/slices/userSlice';

const EditProfile = () => {
    const dispatch = useDispatch();
    const user = useSelector((state: RootState) => state.user);
    const [fontsLoaded] = useFonts(fonts);

    const [personalAlert, setPersonalAlert] = useState(false);
    const [laboralAlert, setLaboralAlert] = useState(false);
    const [logoutAlert, setLogoutAlert] = useState(false);
    const [logoutErrorAlert, setLogoutErrorAlert] = useState(false);

    const navigateToEditImageProfile = () => {
        router.push("/profile/editImageProfile");
    };

    const handlePersonalInfoConfirm = () => {
        setPersonalAlert(false);
        router.push('/(main)/(tabs)/profile/editPersonalInfo1');
    };

    const handleLaboralInfoConfirm = () => {
        setLaboralAlert(false);
        router.push('/(main)/(tabs)/profile/editWorkInfo');
    };

    // ------------------------------
    // 🔐 LOGOUT - FIX IMPORTANTE
    // ------------------------------
    const handleLogoutPress = () => {
        // Este solo muestra el modal, NO ejecuta logout
        setLogoutAlert(true);
    };

    const handleLogoutConfirm = async () => {
        setLogoutAlert(false);

        try {
            await logoutRequest(); // Llama a tu backend
            dispatch(logout());    // Limpia Redux
            dispatch(clearUserProfile());

            // Esperamos un tick para evitar el error "navigate before mounting"
            setTimeout(() => {
                router.replace('/(main)/(auth)');
            }, 150);

        } catch (e) {
            console.error('Error al cerrar sesión:', e);
            setLogoutErrorAlert(true);
        }
    };

    const handleLogoutCancel = () => {
        setLogoutAlert(false);
    };

    const closeLogoutErrorAlert = () => {
        setLogoutErrorAlert(false);
    };

    const goBack = () => {
        router.back();
    };

    return (
        <SafeAreaView style={styles.container}>
            <ImageBackground
                style={styles.overlay}
                source={imagePath.editProfileBackground}
                resizeMode="cover"
            >
                {/* BACK ARROW */}
                <View style={styles.backArrowContainer}>
                    <Pressable
                        style={({ pressed }) => [styles.backArrow, pressed && { opacity: 0.5 }]}
                        onPress={goBack}
                    >
                        <Ionicons name="arrow-back" size={24} color="white" />
                    </Pressable>
                </View>

                <ScrollView
                    contentContainerStyle={styles.scrollContent}
                    showsVerticalScrollIndicator={false}
                >
                    {/* HEADER */}
                    <View style={styles.header}>
                        <Image
                            source={imagePath.icon}
                            style={styles.iconStyle}
                            resizeMode="contain"
                        />

                        <View style={styles.avatarWrapper}>
                            <Image
                                source={
                                    user.imageProfile
                                        ? { uri: user.imageProfile }
                                        : imagePath.defaultUserImage
                                }
                                style={styles.userImage}
                                resizeMode="cover"
                            />
                            <Pressable
                                style={styles.editButton}
                                onPress={navigateToEditImageProfile}
                            >
                                <Ionicons
                                    name="pencil"
                                    size={14}
                                    color="#0E3549"
                                />
                            </Pressable>
                        </View>

                        <Text style={styles.editionText}>
                            Hola {user.name}!{'\n'}
                            <Text style={styles.subText}>Te encuentras en edición de perfil</Text>
                        </Text>
                    </View>

                    {/* MAIN BUTTONS */}
                    <View style={styles.mainButtonsContainer}>
                        <ButtonComponent
                            title="Editar información personal"
                            iconName="person-outline"
                            onPress={() => setPersonalAlert(true)}
                        />

                        <ButtonComponent
                            title="Editar información laboral"
                            iconName="briefcase-outline"
                            onPress={() => setLaboralAlert(true)}
                        />
                    </View>

                    {/* LOGOUT BUTTON */}
                    <View style={styles.logoutContainer}>
                        <ButtonComponent
                            title="Cerrar sesión"
                            iconName="log-out-outline"
                            onPress={handleLogoutPress}  // SOLO ABRE EL MODAL
                        />
                    </View>
                </ScrollView>
            </ImageBackground>

            {/* ALERTAS */}
            <CustomAlert
                visible={personalAlert}
                title="Editar información personal"
                message="¿Deseas editar tu información personal? Se actualizarán los datos de tu perfil"
                type="info"
                showCancel={true}
                confirmText="Confirmar"
                cancelText="Cancelar"
                onConfirm={handlePersonalInfoConfirm}
                onCancel={() => setPersonalAlert(false)}
            />

            <CustomAlert
                visible={laboralAlert}
                title={
                    user.isWorkerProfileComplete
                        ? "Editar información laboral"
                        : "Perfil de trabajador incompleto"
                }
                message={
                    user.isWorkerProfileComplete
                        ? "¿Deseás editar tu información laboral? Se actualizarán los datos visibles en tu perfil de trabajador."
                        : "Aún no completaste tu perfil laboral. Para figurar como trabajador y recibir ofertas, debés completarlo."
                }
                type={user.isWorkerProfileComplete ? "info" : "warning"}
                showCancel={true}
                confirmText={user.isWorkerProfileComplete ? "Sí, editar" : "Completar ahora"}
                cancelText="Cancelar"
                onConfirm={() => {
                    setLaboralAlert(false);
                    if (user.isWorkerProfileComplete) {
                        router.push('/(main)/(tabs)/profile/editWorkInfo');
                    } else {
                        router.push('/(main)/(onBoarding)/completeJobProfile');
                    }
                }}
                onCancel={() => setLaboralAlert(false)}
            />

            <CustomAlert
                visible={logoutAlert}
                title="Cerrar sesión"
                message="¿Estás seguro de que deseas cerrar sesión?"
                type="warning"
                showCancel={true}
                confirmText="Sí, cerrar sesión"
                cancelText="Cancelar"
                onConfirm={handleLogoutConfirm}
                onCancel={handleLogoutCancel}
            />

            <CustomAlert
                visible={logoutErrorAlert}
                title="Error"
                message="Ocurrió un error al cerrar la sesión. Por favor, inténtalo de nuevo."
                type="error"
                confirmText="Entendido"
                onConfirm={closeLogoutErrorAlert}
            />
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#0E3549',
    },
    overlay: {
        flex: 1,
    },
    scrollContent: {
        flexGrow: 1,
        justifyContent: 'space-between',
        paddingBottom: moderateScale(20),
    },
    backArrowContainer: {
        position: 'absolute',
        top: moderateScale(10),
        left: moderateScale(15),
        zIndex: 1,
    },
    backArrow: {
        backgroundColor: 'rgba(0, 0, 0, 0.3)',
        borderRadius: moderateScale(20),
        padding: moderateScale(8),
    },
    header: {
        alignItems: 'center',
        paddingTop: moderateScale(50), 
        paddingHorizontal: moderateScale(20),
        gap: moderateScale(16),
    },
    iconStyle: {
        width: moderateScale(40),
        height: moderateScale(40),
    },
    avatarWrapper: {
        position: 'relative',
        width: moderateScale(100),
        height: moderateScale(100),
        justifyContent: 'center',
        alignItems: 'center',
    },
    userImage: {
        width: '100%',
        height: '100%',
        borderRadius: moderateScale(50),
        borderWidth: 3,
        borderColor: '#FFFFFF',
    },
    editButton: {
        position: 'absolute',
        bottom: -2,
        right: -2,
        backgroundColor: '#D9D9D9',
        width: moderateScale(32),
        height: moderateScale(32),
        borderRadius: moderateScale(16),
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 2,
        borderColor: '#0E3549',
    },
    editionText: {
        textAlign: 'center',
        fontSize: moderateScale(22),
        fontFamily: 'Roboto_300Light',
        color: '#FFFFFF',
        lineHeight: moderateScale(28),
    },
    subText: {
        fontSize: moderateScale(16),
        color: '#E0E0E0',
    },
    mainButtonsContainer: {
        paddingHorizontal: moderateScale(30),
        gap: moderateScale(16),
        marginTop: moderateScale(30),
    },
    logoutContainer: {
        paddingHorizontal: moderateScale(30),
        marginTop: moderateScale(40),
    },
});

export default EditProfile;
