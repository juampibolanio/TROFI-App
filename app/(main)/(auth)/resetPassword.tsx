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
import { useURL } from 'expo-linking';
import { moderateScale } from 'react-native-size-matters';
import * as Linking from 'expo-linking';
import api from '@/services/api'; 
import { resetPassword } from '@/services/authService';

const ResetPasswordScreen = () => {
    const [email, setEmail] = useState('');
    const [token, setToken] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirmation, setPasswordConfirmation] = useState('');
    const [loading, setLoading] = useState(false);

    const router = useRouter();

    useEffect(() => {
        const handleDeepLink = ({ url }: { url: string }) => {
            const { queryParams } = Linking.parse(url);
            if (queryParams?.token && queryParams?.email) {
                setToken(queryParams.token as string);
                setEmail(queryParams.email as string);
            }
        };

        Linking.getInitialURL().then((url) => {
            if (url) handleDeepLink({ url });
        });

        const subscription = Linking.addEventListener('url', handleDeepLink);
        return () => subscription.remove();
    }, []);

    const handleResetPassword = async () => {
        if (!password || password.length < 8) {
            return Alert.alert('Error', 'La contraseña debe tener al menos 8 caracteres.');
        }

        if (password !== passwordConfirmation) {
            return Alert.alert('Error', 'Las contraseñas no coinciden.');
        }

        setLoading(true);
        try {
            await resetPassword({ email, token, password, password_confirmation: passwordConfirmation });

            Alert.alert('Éxito', 'Tu contraseña fue restablecida correctamente.');
            router.replace('/(main)/(auth)'); 
        } catch (error: any) {
            console.error(error);
            Alert.alert('Error', error.response?.data?.message || 'No se pudo restablecer la contraseña.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Restablecer Contraseña</Text>
            <Text style={styles.label}>Nueva contraseña</Text>
            <TextInput
                style={styles.input}
                secureTextEntry
                placeholder="Contraseña"
                value={password}
                onChangeText={setPassword}
            />
            <Text style={styles.label}>Confirmar contraseña</Text>
            <TextInput
                style={styles.input}
                secureTextEntry
                placeholder="Confirmar contraseña"
                value={passwordConfirmation}
                onChangeText={setPasswordConfirmation}
            />
            <TouchableOpacity style={styles.button} onPress={handleResetPassword} disabled={loading}>
                {loading ? <ActivityIndicator color="white" /> : <Text style={styles.buttonText}>Restablecer</Text>}
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
    label: {
        color: 'white',
        marginBottom: moderateScale(6),
    },
    input: {
        backgroundColor: 'white',
        padding: moderateScale(10),
        borderRadius: 8,
        marginBottom: moderateScale(15),
    },
    button: {
        backgroundColor: '#FF9800',
        padding: moderateScale(12),
        borderRadius: 8,
        alignItems: 'center',
    },
    buttonText: {
        color: 'white',
        fontWeight: 'bold',
    },
});

export default ResetPasswordScreen;