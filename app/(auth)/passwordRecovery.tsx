import React, { useState } from 'react';
import { Roboto_300Light, Roboto_400Regular, Roboto_700Bold, useFonts } from '@expo-google-fonts/roboto';
import { View, Text, StyleSheet, ImageBackground, Image, TextInput, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import imagePath from '@/constants/imagePath';
import { moderateScale, verticalScale } from 'react-native-size-matters';
import BottomComponent from '@/components/atoms/BottomComponent';
import { router } from 'expo-router';
import { CustomTextInput } from '@/components/atoms/CustomTextInput';
import HorizontalRule from '@/components/atoms/HorizontalRule';

const passwordRecovery = () => {

    /* CARGA DE FUENTES */
    const [fontsLoaded] = useFonts({
        Roboto_400Regular,
        Roboto_700Bold,
        Roboto_300Light
    });

    const [phoneNumber, setPhoneNumber] = useState('');

    return (
        <>
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
                            <Text style={styles.recoverySubtitle}>Para recuperar su contraseña, enviaremos un mensaje a su teléfono celular</Text>
                        </View>
                        <HorizontalRule />
                        <View style={styles.inputContainer}>
                            <Text style={styles.label}>Brindenos más detalles sobre su cuenta</Text>
                            <CustomTextInput
                                placeholder='Ingrese su número de teléfono'
                                value={phoneNumber}
                                onChangeText={setPhoneNumber}
                                keyboardType='email-address'
                                autoCapitalize='none'
                            />

                            <BottomComponent title="Usa un correo en su lugar" onPress={() => { }} />
                        </View>
                    </View>

                    {/* FOOTER */}
                    <View style={styles.footer}>
                        <HorizontalRule />
                    </View>

                </ImageBackground>
            </SafeAreaView>
        </>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#0E3549',
    },
    header: {

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
    body: {
        flex: 1,
        alignItems: 'center',
        gap: moderateScale(15)
    },
    iconStyle: {
        width: moderateScale(50),
        height: moderateScale(50),
    },
    titlesContainer: {
    },
    recoveryTittle: {
        fontFamily: 'Roboto_300Light',
        fontSize: moderateScale(30),
        color: 'white'
    },
    recoverySubtitle: {
        fontFamily: 'Roboto_300Light',
        fontSize: moderateScale(15),
        color: 'white'
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
    footer: {
        marginBottom: verticalScale(58)
    }
});

export default passwordRecovery;