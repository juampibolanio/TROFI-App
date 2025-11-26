import React, { useEffect, useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TextInput,
    TouchableOpacity,
    Alert,
    ActivityIndicator,
} from 'react-native';
import { useRouter } from 'expo-router';
import { moderateScale } from 'react-native-size-matters';
import * as Linking from 'expo-linking';
import { resetPasswordRequest } from '@/services/authService'; // ✅ CAMBIO: Importar función correcta

const ResetPasswordScreen = () => {
    const [oobCode, setOobCode] = useState(''); // ✅ CAMBIO: oobCode en lugar de token
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [loading, setLoading] = useState(false);

    const router = useRouter();

    useEffect(() => {
        const handleDeepLink = ({ url }: { url: string }) => {
            const { queryParams } = Linking.parse(url);
            
            // ✅ Firebase envía un parámetro "oobCode" en lugar de "token"
            if (queryParams?.oobCode) {
                setOobCode(queryParams.oobCode as string);
            }
        };

        Linking.getInitialURL().then((url) => {
            if (url) handleDeepLink({ url });
        });

        const subscription = Linking.addEventListener('url', handleDeepLink);
        return () => subscription.remove();
    }, []);

    const handleResetPassword = async () => {
        // Validaciones
        if (!newPassword || newPassword.length < 6) {
            return Alert.alert('Error', 'La contraseña debe tener al menos 6 caracteres.');
        }

        if (newPassword !== confirmPassword) {
            return Alert.alert('Error', 'Las contraseñas no coinciden.');
        }

        if (!oobCode) {
            return Alert.alert('Error', 'Código de verificación no válido. Por favor, usa el enlace enviado a tu correo.');
        }

        setLoading(true);
        try {
            // ✅ CAMBIO: Usar resetPasswordRequest con oobCode
            await resetPasswordRequest(oobCode, newPassword);

            Alert.alert('Éxito', 'Tu contraseña fue restablecida correctamente.');
            router.replace('/(main)/(auth)');
        } catch (error: any) {
            console.error(error);
            
            let errorMessage = 'No se pudo restablecer la contraseña.';
            
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
        <View style={styles.container}>
            <Text style={styles.title}>Restablecer Contraseña</Text>
            
            {/* Mostrar mensaje si no hay código */}
            {!oobCode && (
                <View style={styles.warningContainer}>
                    <Text style={styles.warningText}>
                        ⚠️ Por favor, usa el enlace enviado a tu correo electrónico
                    </Text>
                </View>
            )}
            
            <Text style={styles.label}>Nueva contraseña</Text>
            <TextInput
                style={styles.input}
                secureTextEntry
                placeholder="Contraseña (mín. 6 caracteres)"
                placeholderTextColor="#999"
                value={newPassword}
                onChangeText={setNewPassword}
            />
            
            <Text style={styles.label}>Confirmar contraseña</Text>
            <TextInput
                style={styles.input}
                secureTextEntry
                placeholder="Confirmar contraseña"
                placeholderTextColor="#999"
                value={confirmPassword}
                onChangeText={setConfirmPassword}
            />
            
            <TouchableOpacity 
                style={[styles.button, (loading || !oobCode) && styles.disabledButton]} 
                onPress={handleResetPassword} 
                disabled={loading || !oobCode}
            >
                {loading ? (
                    <ActivityIndicator color="white" />
                ) : (
                    <Text style={styles.buttonText}>Restablecer</Text>
                )}
            </TouchableOpacity>

            <TouchableOpacity 
                style={styles.linkButton}
                onPress={() => router.replace('/(main)/(auth)')}
            >
                <Text style={styles.linkText}>Volver al inicio de sesión</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#0E3549',
        padding: moderateScale(20),
        justifyContent: 'center',
    },
    title: {
        fontSize: moderateScale(24),
        color: 'white',
        fontWeight: 'bold',
        marginBottom: moderateScale(20),
        textAlign: 'center',
    },
    warningContainer: {
        backgroundColor: 'rgba(255, 152, 0, 0.2)',
        padding: moderateScale(12),
        borderRadius: 8,
        marginBottom: moderateScale(16),
        borderLeftWidth: 4,
        borderLeftColor: '#FF9800',
    },
    warningText: {
        color: '#FFB74D',
        fontSize: moderateScale(13),
        textAlign: 'center',
    },
    label: {
        color: 'white',
        marginBottom: moderateScale(6),
        fontSize: moderateScale(14),
    },
    input: {
        backgroundColor: 'white',
        padding: moderateScale(12),
        borderRadius: 8,
        marginBottom: moderateScale(15),
        fontSize: moderateScale(14),
    },
    button: {
        backgroundColor: '#FF9800',
        padding: moderateScale(14),
        borderRadius: 8,
        alignItems: 'center',
        marginTop: moderateScale(10),
    },
    disabledButton: {
        backgroundColor: '#555',
        opacity: 0.6,
    },
    buttonText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: moderateScale(15),
    },
    linkButton: {
        marginTop: moderateScale(20),
        alignItems: 'center',
    },
    linkText: {
        color: '#FFB74D',
        fontSize: moderateScale(14),
        textDecorationLine: 'underline',
    },
});

export default ResetPasswordScreen;