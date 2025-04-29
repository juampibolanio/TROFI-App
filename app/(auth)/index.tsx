import { View, Text, SafeAreaView, StyleSheet, Image } from 'react-native'
import React from 'react'
import imagePath from '@/constants/imagePath';
import { moderateScale } from 'react-native-size-matters'
import { Roboto_300Light, Roboto_400Regular, Roboto_700Bold, useFonts } from '@expo-google-fonts/roboto';

const Auth = () => {
    const [fontsLoaded] = useFonts({ 
        Roboto_400Regular,
        Roboto_700Bold,
        Roboto_300Light
    });


    return (
        <>
        <SafeAreaView style={styles.container}> 
            {/* HEADER */}
            <View style={styles.header}>
                <Image source={imagePath.icon} style={styles.iconStyle} resizeMode="contain" />
            </View>
            {/* BODY */}
            <View style={styles.body}>
                <Text style={styles.loginTitle}>¡Bienvenido!</Text>
            </View>
            <View style={styles.footer}>
                <Text style={styles.footerText}>¿No tienes una cuenta? Registrarse</Text>
            </View>
        </SafeAreaView>
        </>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#0E3549",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "space-between",
        paddingVertical: moderateScale(21),
        gap: moderateScale(30)
    },
    header: {
    },
    body: {
        flex: 1
    },
    footer: {},
    iconStyle: {
        width: moderateScale(50),
        height: moderateScale(50),
    },
    loginTitle: {
        color: '#FFFFFF',
        fontSize: moderateScale(35),
        fontFamily: 'Roboto_300Light'
    },
    footerText: {
        fontSize: moderateScale(14),
        fontFamily: 'Roboto_300Light',
        color: '#FFFFFF'
    }
});

export default Auth;