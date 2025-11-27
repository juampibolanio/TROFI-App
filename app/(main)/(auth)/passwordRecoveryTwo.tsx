import { useState } from 'react';
import {
    View, Text, StyleSheet, ImageBackground, Image,
    TouchableOpacity, Alert, ActivityIndicator
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { moderateScale, verticalScale } from 'react-native-size-matters';
import { useFonts } from '@expo-google-fonts/roboto';

import imagePath from '@/constants/imagePath';
import fonts from '@/constants/fonts';
import { forgotPasswordRequest } from '@/services/authService'; // ✅ CAMBIO: Importar la función correcta

import { CustomTextInput } from '@/components/atoms/CustomTextInput';
import HorizontalRule from '@/components/atoms/HorizontalRule';

const PasswordRecovery = () => {
    const [fontsLoaded] = useFonts(fonts);
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSendResetEmail = async () => {
        if (!email) return Alert.alert('Error', 'Por favor ingresa tu email.');

        // Validación básica de email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return Alert.alert('Email inválido', 'Por favor ingresa un correo electrónico válido.');
        }

        try {
            setLoading(true);
            // ✅ CAMBIO: Usar forgotPasswordRequest del authService
            await forgotPasswordRequest(email);
            
            Alert.alert(
                'Éxito', 
                'Te enviamos un email con el enlace para restablecer tu contraseña. Revisa tu bandeja de entrada.'
            );
            setEmail('');
        } catch (error: any) {
            console.error(error);
            
            // Manejo de errores mejorado
            let errorMessage = 'Hubo un problema al enviar el correo.';
            
            if (error.response?.data?.message) {
                errorMessage = error.response.data.message;
            } else if (error.message) {
                errorMessage = error.message;
            }
            
            Alert.alert('Error', errorMessage);
        } finally {
            setLoading(false);
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <ImageBackground
                source={imagePath.passwordRecoveryBackground}
                style={styles.overlay}
                resizeMode='cover'
            >
                {/* HEADER */}
                <View style={styles.header}>
                    <Image source={imagePath.icon} style={styles.iconStyle} resizeMode='contain' />
                </View>

                {/* BODY */}
                <View style={styles.body}>
                    <HorizontalRule />
                    <View style={styles.titlesContainer}>
                        <Text style={styles.recoveryTittle}>Recuperar Contraseña</Text>
                        <Text style={styles.recoverySubtitle}>
                            Para recuperar tu contraseña, enviaremos un mensaje a tu correo electrónico con un enlace para restablecerla.
                        </Text>
                    </View>
                    <HorizontalRule />
                    <View style={styles.inputContainer}>
                        <Text style={styles.label}>Correo electrónico</Text>
                        <CustomTextInput
                            placeholder='ejemplo@correo.com'
                            value={email}
                            onChangeText={setEmail}
                            keyboardType='email-address'
                            autoCapitalize='none'
                        />

                        <TouchableOpacity
                            style={[styles.sendButton, loading && styles.disabledButton]}
                            onPress={handleSendResetEmail}
                            disabled={loading}
                        >
                            {loading ? (
                                <ActivityIndicator color="white" />
                            ) : (
                                <Text style={styles.sendButtonText}>Enviar enlace</Text>
                            )}
                        </TouchableOpacity>
                    </View>
                </View>

                {/* FOOTER */}
                <View style={styles.footer}>
                    <HorizontalRule />
                </View>
            </ImageBackground>
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
        flexDirection: 'column',
        paddingHorizontal: moderateScale(20),
        paddingVertical: verticalScale(20),
        gap: moderateScale(30),
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    header: {},
    iconStyle: {
        width: moderateScale(50),
        height: moderateScale(50),
    },
    body: {
        flex: 1,
        alignItems: 'center',
        gap: moderateScale(15)
    },
    titlesContainer: {},
    recoveryTittle: {
        fontFamily: 'Roboto_300Light',
        fontSize: moderateScale(30),
        color: 'white'
    },
    recoverySubtitle: {
        fontFamily: 'Roboto_300Light',
        fontSize: moderateScale(15),
        color: 'white',
        textAlign: 'center'
    },
    inputContainer: {
        flex: 1,
        gap: moderateScale(15)
    },
    label: {
        color: 'white',
        fontFamily: 'Roboto_300Light',
        fontSize: moderateScale(14),
        marginLeft: moderateScale(20)
    },
    sendButton: {
        backgroundColor: 'rgba(164, 148, 148, 0.4)',
        width: '100%',
        paddingVertical: verticalScale(13),
        paddingHorizontal: verticalScale(75),
        borderRadius: verticalScale(30),
    },
    disabledButton: {
        opacity: 0.6,
    },
    sendButtonText: {
        color: '#FFFFFF',
        fontWeight: 'bold',
        textAlign: 'center',
    },
    footer: {
        marginBottom: verticalScale(58)
    }
});

export default PasswordRecovery;