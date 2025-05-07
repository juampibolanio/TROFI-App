import { View, Text, SafeAreaView, StyleSheet, Image, Switch, ImageBackground, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import imagePath from '@/constants/imagePath';
import { moderateScale, scale, verticalScale } from 'react-native-size-matters'
import { Roboto_300Light, Roboto_400Regular, Roboto_700Bold, useFonts } from '@expo-google-fonts/roboto';
import { TextInput } from 'react-native';
import BottomComponent from '@/components/atoms/BottomComponent';
import { router } from 'expo-router';
import { CustomTextInput } from '@/components/atoms/CustomTextInput';

const Auth = () => {
    const [fontsLoaded] = useFonts({
        Roboto_400Regular,
        Roboto_700Bold,
        Roboto_300Light
    });

    let navigateToRegister = () => {
        router.push("/(auth)/register")
    }

    const [isRemembered, setIsRemembered] = useState(false)

    const [password, setPassword] = useState('');
    const [nameEmail, setNameEmail] = useState('');

    return (
        <>
            <SafeAreaView style={styles.container}>
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
                                placeholder='Ingrese su nombre/email'
                                value={nameEmail}
                                onChangeText={setNameEmail}
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

                        <View style={styles.rememberContainer}>
                            <Text style={styles.rememberText}>Recuérdame</Text>
                            <Text style={styles.forgotText} /*onPress={null}*/>
                                ¿Olvidaste tu contraseña?
                            </Text>
                        </View>

                        <View style={styles.bottomContainer}>
                            <BottomComponent title="Iniciar sesión" onPress={() => { }} />
                        </View>
                    </View>

                    <View style={styles.footer}>
                        <View style={styles.footerIcons}>
                            <Text style={styles.footerIconsTitle}>----------------- Inicia sesión con redes sociales -----------------</Text>
                            <View style={styles.icons}>
                                <Image source={imagePath.facebook} style={styles.icon} />
                                <Image source={imagePath.twitter} style={styles.icon} />
                                <Image source={imagePath.google} style={styles.icon} />
                            </View>
                        </View>

                        <View style={styles.footerLinkRegister}>
                            <Text style={styles.footerText}>
                                ¿No tienes una cuenta?{'    '}
                            </Text>
                            <TouchableOpacity onPress={navigateToRegister}>
                                <Text style={styles.boldText}>
                                    ¡Regístrate!
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </ImageBackground>
            </SafeAreaView>
        </>
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
    header: {
    },
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
        alignItems: 'center'
    },
    icon: {

    },
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
        alignItems: 'center',
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