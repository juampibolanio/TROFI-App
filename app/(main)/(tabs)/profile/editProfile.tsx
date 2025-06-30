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

const editProfile = () => {
    const dispatch = useDispatch();
    const user = useSelector((state: RootState) => state.user);
    const [fontsLoaded] = useFonts(fonts);

    // Estados para controlar los diferentes alerts
    const [personalAlert, setPersonalAlert] = useState(false);
    const [laboralAlert, setLaboralAlert] = useState(false);
    const [logoutAlert, setLogoutAlert] = useState(false);
    const [logoutErrorAlert, setLogoutErrorAlert] = useState(false);

    const navigateToEditImageProfile = () => {
        router.push("/profile/editImageProfile");
    };

    // Handlers para los alerts
    const handlePersonalInfoConfirm = () => {
        setPersonalAlert(false);
        router.push('/(main)/(tabs)/profile/editPersonalInfo1');
    };

    const handleLaboralInfoConfirm = () => {
        setLaboralAlert(false);
        router.push('/(main)/(tabs)/profile/editWorkInfo');
    };

    // Función para mostrar el modal de confirmación de logout
    const handleLogoutPress = () => {
        setLogoutAlert(true);
    };

    // Función para confirmar el logout (usando la lógica de Settings)
    const handleLogoutConfirm = async () => {
        setLogoutAlert(false);
        try {
            await logoutRequest();

            dispatch(logout()); // limpia Redux y AsyncStorage
            dispatch(clearUserProfile()); // limpia perfil
            router.replace('/(main)/(auth)'); // redirige al login
        } catch (e) {
            console.error('Error al cerrar sesión:', e);
            setLogoutErrorAlert(true);
        }
    };

    // Función para cancelar el logout
    const handleLogoutCancel = () => {
        setLogoutAlert(false);
    };

    // Función para cerrar el alert de error de logout
    const closeLogoutErrorAlert = () => {
        setLogoutErrorAlert(false);
    };

    return (
        <SafeAreaView style={styles.container}>
            <ImageBackground
                style={styles.overlay}
                source={imagePath.editProfileBackground}
                resizeMode="cover">

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
                                onPress={navigateToEditImageProfile}>
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

                    {/* BODY - Botones principales */}
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

                    {/* FOOTER - Botón de cerrar sesión */}
                    <View style={styles.logoutContainer}>
                        <ButtonComponent
                            title="Cerrar sesión"
                            iconName="log-out-outline"
                            onPress={handleLogoutPress}
                        />
                    </View>
                </ScrollView>
            </ImageBackground>

            {/* ALERT INFORMACIÓN PERSONAL */}
            <CustomAlert
                visible={personalAlert}
                title="Editar información personal"
                message="Para editar tu información personal deberás proporcionar datos adicionales."
                type="info"
                showCancel={true}
                confirmText="Confirmar"
                cancelText="Cancelar"
                onConfirm={handlePersonalInfoConfirm}
                onCancel={() => setPersonalAlert(false)}
            />

            {/* ALERT INFORMACIÓN LABORAL */}
            <CustomAlert
                visible={laboralAlert}
                title="Editar información laboral"
                message="Para editar tu información laboral deberás proporcionar datos adicionales."
                type="info"
                showCancel={true}
                confirmText="Confirmar"
                cancelText="Cancelar"
                onConfirm={handleLaboralInfoConfirm}
                onCancel={() => setLaboralAlert(false)}
            />

            {/* ALERT CERRAR SESIÓN */}
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

            {/* ALERT ERROR DE LOGOUT */}
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
    header: {
        alignItems: 'center',
        paddingTop: moderateScale(20),
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

export default editProfile;