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

    const handleLogoutPress = () => {
        setShowLogoutAlert(true);
    };

    const confirmLogout = async () => {
        setShowLogoutAlert(false);
        try {
            await logoutRequest();

            dispatch(logout());
            dispatch(clearUserProfile());
            router.replace('/(main)/(auth)');
        } catch (e) {
            console.error('Error al cerrar sesión:', e);
            setShowErrorAlert(true);
        }
    };

    const cancelLogout = () => {
        setShowLogoutAlert(false);
    };

    const closeErrorAlert = () => {
        setShowErrorAlert(false);
    };

    if (!fontsLoaded) return null;

    return (
        <SafeAreaView style={styles.container}>
            <ImageBackground
                source={imagePath.backgroundSettings}
                resizeMode='cover'
                style={styles.overlay}
            >

                <View style={styles.header}>
                    <Image source={imagePath.icon} style={styles.iconStyle} resizeMode='contain' />
                </View>

                <View style={styles.body}>
                    <SettingsButton title="Contacto" iconName="mail-open-sharp" route="/settings/contact" />
                    <SettingsButton title="Preguntas frecuentes" iconName="help" route="/settings/frequentlyQuestions" />
                    <SettingsButton title="Reportar un bug" iconName="bug-outline" route="/settings/reportBug" />
                    <SettingsButton title="Términos y condiciones" iconName="document-text-outline" route="/settings/termsAndConditions" />
                    <SettingsButton title="Acerca de TROFI" iconName="information-circle" route="/settings/aboutTrofi" />
                </View>

                <View style={styles.footer}>
                    <Pressable style={({ pressed }) => [
                        styles.logoutButton,
                        pressed && { opacity: 0.8 },
                    ]} onPress={handleLogoutPress}>
                        <Ionicons name="log-out-outline" size={24} color="#FFFFFF" />
                        <Text style={styles.logoutButtonText}>
                            Cerrar sesión
                        </Text>
                    </Pressable>
                </View>

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
        backgroundColor: '#0E3549', // fondo boton cerrarsesion -> azul oscuro
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
        color: '#FFFFFF', // texto blanco
    }
});

export default Settings;
