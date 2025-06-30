import {
    View,
    Text,
    SafeAreaView,
    StyleSheet,
    Image,
    ImageBackground,
    Pressable,
} from 'react-native';
import React, { useState } from 'react';
import imagePath from '@/constants/imagePath';
import { moderateScale, verticalScale } from 'react-native-size-matters';
import SettingsButton from '@/components/SettingsButton';
import CustomAlert from '@/components/atoms/CustomAlert'; 
import { Ionicons } from '@expo/vector-icons';
import { useDispatch } from 'react-redux';
import { logoutRequest } from '@/services/authService';
import { logout } from '@/redux/slices/authSlice';
import { clearUserProfile } from '@/redux/slices/userSlice';
import { router } from 'expo-router';
import fonts from '@/constants/fonts';
import { useFonts } from '@expo-google-fonts/roboto';

const Settings = () => {
    const dispatch = useDispatch();
    const [showLogoutAlert, setShowLogoutAlert] = useState(false);
    const [showErrorAlert, setShowErrorAlert] = useState(false);

    const [fontsLoaded] = useFonts(fonts);

    // Función para mostrar el modal de confirmación de logout
    const handleLogoutPress = () => {
        setShowLogoutAlert(true);
    };

    // Función para confirmar el logout
    const confirmLogout = async () => {
        setShowLogoutAlert(false);
        try {
            await logoutRequest();

            dispatch(logout()); // limpia Redux y AsyncStorage
            dispatch(clearUserProfile()); // limpia perfil
            router.replace('/(main)/(auth)'); // redirige al login
        } catch (e) {
            console.error('Error al cerrar sesión:', e);
            setShowErrorAlert(true);
        }
    };

    // Función para cancelar el logout
    const cancelLogout = () => {
        setShowLogoutAlert(false);
    };

    // Función para cerrar el alert de error
    const closeErrorAlert = () => {
        setShowErrorAlert(false);
    };

    return (
        <SafeAreaView style={styles.container}>
            <ImageBackground
                source={imagePath.backgroundSettings}
                resizeMode='cover'
                style={styles.overlay}
            >

                {/* HEADER */}
                <View style={styles.header}>
                    <Image source={imagePath.icon} style={styles.iconStyle} resizeMode='contain' />
                </View>

                {/* BODY */}
                <View style={styles.body}>
                    <SettingsButton title="Contacto" iconName="mail-open-sharp" route="/settings/contact" />
                    <SettingsButton title="Preguntas frecuentes" iconName="help" route="/settings/frequentlyQuestions" />
                    <SettingsButton title="Acerca de TROFI" iconName="information-circle" route="/settings/aboutTrofi" />
                    <SettingsButton title="Reportar un bug" iconName="bug-outline" route="/settings/reportBug" />
                    <SettingsButton title="Términos y condiciones" iconName="document-text-outline" route="/settings/termsAndConditions" />
                </View>

                {/* FOOTER */}
                <View style={styles.footer}>
                    <Pressable style={({ pressed }) => [
                        styles.logoutButton,
                        pressed && { opacity: 0.8 },
                    ]} onPress={handleLogoutPress}>
                        <Ionicons name="log-out-outline" size={24} color="black" />
                        <Text style={styles.logoutButtonText}>
                            Cerrar sesión
                        </Text>
                    </Pressable>
                </View>

                {/* MODALES DE CONFIRMACIÓN */}
                <CustomAlert
                    visible={showLogoutAlert}
                    type="warning"
                    title="Cerrar sesión"
                    message="¿Estás seguro de que deseas cerrar sesión?"
                    showCancel={true}
                    confirmText="Sí, cerrar sesión"
                    cancelText="Cancelar"
                    onConfirm={confirmLogout}
                    onCancel={cancelLogout}
                />

                <CustomAlert
                    visible={showErrorAlert}
                    type="error"
                    title="Error"
                    message="Ocurrió un error al cerrar la sesión. Por favor, inténtalo de nuevo."
                    confirmText="Entendido"
                    onConfirm={closeErrorAlert}
                />

            </ImageBackground>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#0E3549",
    },
    overlay: {
        flex: 1,
        paddingHorizontal: moderateScale(20),
        paddingVertical: moderateScale(20),
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: moderateScale(30),
        flexDirection: 'column',
    },
    iconStyle: {
        width: moderateScale(50),
        height: moderateScale(50),
    },
    header: {},
    body: {
        flex: 1,
        alignItems: 'center',
        gap: moderateScale(25),
    },
    footer: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center',

    },
    logoutButton: {
        backgroundColor: '#D9D9D9',
        paddingHorizontal: moderateScale(25),
        paddingVertical: moderateScale(15),
        borderRadius: verticalScale(30),
        flexDirection: 'row',
        alignItems: 'center',
        gap: moderateScale(5),
    },
    logoutButtonText: {
        fontSize: moderateScale(13),
        fontWeight: 'bold',
        color: '#000000'
    }
});

export default Settings;