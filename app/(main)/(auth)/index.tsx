import {
    View,
    Text,
    SafeAreaView,
    StyleSheet,
    Image,
    ImageBackground,
    Pressable,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    TouchableWithoutFeedback,
    Keyboard,
} from 'react-native';
import { useState } from 'react';
import imagePath from '@/constants/imagePath';
import { moderateScale, verticalScale } from 'react-native-size-matters';
import { useFonts } from '@expo-google-fonts/roboto';
import BottomComponent from '@/components/atoms/BottomComponent';
import { router } from 'expo-router';
import { CustomTextInput } from '@/components/atoms/CustomTextInput';
import fonts from '@/constants/fonts';
import { useDispatch } from 'react-redux';
import { loginRequest } from '@/services/authService';
import { setCredentials } from '@/redux/slices/authSlice';
import { storeData } from '@/utils/storage';
import { setUserProfile } from '@/redux/slices/userSlice';
import CustomAlert from '@/components/atoms/CustomAlert';

const Auth = () => {
    const [fontsLoaded] = useFonts(fonts);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const dispatch = useDispatch();

    const [alertVisible, setAlertVisible] = useState(false);
    const [alertConfig, setAlertConfig] = useState({
        title: '',
        message: '',
        type: 'error' as 'success' | 'error' | 'warning' | 'info',
        showCancel: false
    });

    const navigateToRegister = () => {
        router.push("/(main)/(auth)/register");
    };

    const navigateToHome = () => {
        router.push('/(main)/(tabs)/featured');
    }

    const showAlert = (title: string, message: string, type: 'success' | 'error' | 'warning' | 'info' = 'error') => {
        setAlertConfig({
            title,
            message,
            type,
            showCancel: false
        });
        setAlertVisible(true);
    };

    const closeAlert = () => {
        setAlertVisible(false);
    };

    const handleLogin = async () => {
        // Validaciones básicas
        if (!email.trim()) {
            showAlert('Campo requerido', 'Por favor ingrese su correo electrónico', 'warning');
            return;
        }

        if (!password.trim()) {
            showAlert('Campo requerido', 'Por favor ingrese su contraseña', 'warning');
            return;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            showAlert('Email inválido', 'Por favor ingrese un correo electrónico válido', 'warning');
            return;
        }

        try {
            // Petición al backend
            const data = await loginRequest(email, password);

            // Validar que el usuario exista
            if (!data.user) {
                showAlert('Error de autenticación', 'No se pudo obtener el perfil del usuario', 'error');
                return;
            }

            const profile = data.user;

            // Guardar token, uid y email en Redux y AsyncStorage
            dispatch(setCredentials({
                token: data.token,
                uid: data.uid,
                email: data.email
            }));

            await storeData('auth', {
                token: data.token,
                uid: data.uid,
                email: data.email
            });

            // Formatear usuario para Redux (camelCase)
            const formattedUser = {
                uid: profile.uid,
                name: profile.name || '',
                email: profile.email || '',
                phoneNumber: profile.phoneNumber || '',
                dni: profile.dni || '',
                userDescription: profile.userDescription || '',
                imageProfile: profile.imageProfile || '',
                location: profile.location || '',
                is_worker: profile.is_worker || false,
                id_job: profile.id_job || null,
                job_description: profile.job_description || '',
                job_images: Array.isArray(profile.job_images) ? profile.job_images : [],
            };

            dispatch(setUserProfile(formattedUser));
            await storeData('user', formattedUser);

            // Alert y navegación
            showAlert('¡Bienvenido!', 'Inicio de sesión exitoso', 'success');

            setTimeout(() => {
                closeAlert();
                navigateToHome();
            }, 1500);

        } catch (e: any) {
            console.error('Error en handleLogin:', e.response?.data || e.message);

            if (e.response?.data?.message) {
                showAlert('Error de autenticación', e.response.data.message, 'error');
            } else {
                showAlert('Error de autenticación', 'Las credenciales ingresadas son incorrectas. Por favor verifique su correo y contraseña.', 'error');
            }
        }
    };


    return (
        <SafeAreaView style={styles.container}>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <KeyboardAvoidingView
                    style={{ flex: 1 }}
                    behavior={Platform.OS === 'ios' ? 'padding' : undefined}
                    keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 0}
                >
                    <ScrollView
                        contentContainerStyle={{ flexGrow: 1 }}
                        keyboardShouldPersistTaps="handled"
                    >
                        <ImageBackground
                            source={imagePath.backgroundLogin}
                            resizeMode="cover"
                            style={styles.overlay}
                        >
                            {/* HEADER */}
                            <View style={styles.header}>
                                <Image source={imagePath.icon} style={styles.iconStyle} resizeMode="contain" />
                            </View>

                            {/* BODY */}
                            <View style={styles.body}>
                                <Text style={styles.loginTitle}>¡Bienvenido!</Text>
                                <View style={styles.inputContainer}>
                                    <CustomTextInput
                                        placeholder='Ingrese su correo electrónico'
                                        value={email}
                                        onChangeText={setEmail}
                                        keyboardType='email-address'
                                        autoCapitalize='none'
                                    />

                                    <CustomTextInput
                                        placeholder='Ingrese su contraseña'
                                        value={password}
                                        onChangeText={setPassword}
                                        isPassword={true}
                                    />
                                </View>

                                <Pressable
                                    style={styles.rememberContainer}
                                    onPress={() => { router.push('/(main)/(auth)/passwordRecoveryTwo') }}
                                >
                                    <Text style={styles.forgotText}>
                                        ¿Olvidaste tu contraseña?
                                    </Text>
                                </Pressable>

                                <View style={styles.bottomContainer}>
                                    <BottomComponent title="Iniciar sesión" onPress={handleLogin} />
                                </View>
                            </View>

                            {/* FOOTER */}
                            <View style={styles.footer}>
                                <View style={styles.footerIcons}>
                                    <Text style={styles.footerIconsTitle}>
                                        ----------------- O Inicia sesión con Google -----------------
                                    </Text>
                                    <View style={styles.icons}>
                                        <Pressable
                                            onPress={() => console.log('Google')}
                                            style={({ pressed }) => [
                                                {
                                                    opacity: pressed ? 0.6 : 1,
                                                    transform: [{ scale: pressed ? 0.95 : 1 }],
                                                },
                                            ]}
                                        >
                                            <Image source={imagePath.google} style={styles.icon} />
                                        </Pressable>
                                    </View>
                                </View>

                                <View style={styles.footerLinkRegister}>
                                    <Text style={styles.footerText}>
                                        ¿No tienes una cuenta?{'    '}
                                    </Text>
                                    <Pressable onPress={navigateToRegister}
                                        style={({ pressed }) => ({
                                            opacity: pressed ? 0.6 : 1
                                        })}
                                    >
                                        <Text style={styles.boldText}>
                                            ¡Regístrate!
                                        </Text>
                                    </Pressable>
                                </View>
                            </View>
                        </ImageBackground>
                    </ScrollView>
                </KeyboardAvoidingView>
            </TouchableWithoutFeedback>

            <CustomAlert
                visible={alertVisible}
                title={alertConfig.title}
                message={alertConfig.message}
                type={alertConfig.type}
                showCancel={alertConfig.showCancel}
                onConfirm={closeAlert}
                confirmText="Aceptar"
            />
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
    },
    header: {},
    body: {
        flex: 1,
        alignItems: 'center',
    },
    iconStyle: {
        width: moderateScale(50),
        height: moderateScale(50),
    },
    loginTitle: {
        color: '#FFFFFF',
        fontSize: moderateScale(35),
        fontFamily: 'Roboto_300Light',
        marginBottom: verticalScale(30)
    },
    footer: {
        flex: 1,
        alignItems: 'center'
    },
    footerText: {
        fontSize: moderateScale(15),
        fontFamily: 'Roboto_300Light',
        color: '#FFFFFF'
    },
    footerIcons: {
        flex: 1,
        alignItems: 'center',
        marginTop: verticalScale(35),
        gap: moderateScale(30)
    },
    footerIconsTitle: {
        color: '#FFFFFF',
    },
    icons: {
        flexDirection: 'row',
        gap: moderateScale(60),
        alignItems: 'center',
        paddingHorizontal: moderateScale(20),
    },
    icon: {},
    inputContainer: {
        height: moderateScale(60),
        width: verticalScale(280),
        gap: moderateScale(5)
    },
    boldText: {
        fontWeight: 'bold',
        color: '#FFFFFF',
    },
    footerLinkRegister: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    rememberContainer: {
        flexDirection: 'row',
        marginTop: verticalScale(50),
        alignItems: 'flex-start',
        gap: moderateScale(25)
    },
    rememberText: {
        color: '#FFFFFF'
    },
    forgotText: {
        color: '#FFFFFF'
    },
    bottomContainer: {
        marginTop: verticalScale(40)
    }
});

export default Auth;
