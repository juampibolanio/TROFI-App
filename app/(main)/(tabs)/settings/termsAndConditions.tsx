import React from 'react'
import imagePath from '@/constants/imagePath';
import { useFonts, Roboto_400Regular, Roboto_700Bold, Roboto_300Light } from '@expo-google-fonts/roboto';
import { SafeAreaView, ScrollView, Text, View, Image } from 'react-native'
import { Dimensions } from 'react-native';

import { StyleSheet } from 'react-native';
import { moderateScale, verticalScale } from 'react-native-size-matters';

const termsAndConditions = () => {
    const [fontsLoaded] = useFonts({
        Roboto_400Regular,
        Roboto_700Bold,
        Roboto_300Light,
    });


    if (!fontsLoaded) return null;

    return (
        <SafeAreaView style={styles.container}>

            {/* icono */}
            <View style={styles.header}>
                <Image source={imagePath.icon} style={styles.icon} />
            </View>

            {/* titulo y cuerpo */}
            <ScrollView contentContainerStyle={styles.scrollContainer}>
                <Text style={styles.title}>Términos y Condiciones</Text>

                <Text style={styles.bodyText}>
                    Bienvenido a TROFI, una aplicación desarrollada para conectar personas que ofrecen servicios profesionales con aquellas que los necesitan.
                    Al utilizar TROFI, aceptás estos términos y condiciones de uso.{"\n\n"}

                    TROFI funciona como una plataforma intermediaria entre profesionales y clientes. No participamos ni nos responsabilizamos por los acuerdos comerciales o personales entre ambas partes.{"\n\n"}

                    Sin embargo, para brindar mayor confianza, realizamos una validación básica de los perfiles profesionales registrados en la plataforma.
                    Aun así, no garantizamos la veracidad absoluta de los datos ni nos responsabilizamos por la conducta de los usuarios.{"\n\n"}

                    Los datos personales que ingreses serán tratados con confidencialidad y no serán compartidos ni vendidos a terceros.
                    Sólo serán utilizados para el correcto funcionamiento de la aplicación.{"\n\n"}

                    Está prohibido utilizar la app con fines ilícitos, ofensivos o que vayan en contra de estos términos.
                    Nos reservamos el derecho de suspender cuentas si se detectan actividades inapropiadas.{"\n\n"}

                    La aplicación puede ser actualizada periódicamente. Nos reservamos el derecho de modificar estos términos en cualquier momento.
                    Te sugerimos consultarlos regularmente.{"\n\n"}

                    Si tenés dudas o sugerencias, escribinos a contacto@trofiapp.com.{"\n\n"}

                    Gracias por confiar en TROFI.
                </Text>
            </ScrollView>

            {/* footer */}
            <View style={styles.footer}>
                <Text style={styles.rightsText}>©2025 TROFI. Todos los derechos reservados.</Text>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#0E3549',
    },
    header: {
        height: verticalScale(40),
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#0E3549',
    },
    icon: {
        width: moderateScale(40),
        height: moderateScale(40),
        resizeMode: 'contain',
    },
    scrollContainer: {
        paddingHorizontal: moderateScale(20),
        paddingTop: verticalScale(10),
        paddingBottom: verticalScale(20),
        maxWidth: Dimensions.get('window').width * 0.95,
        alignSelf: 'center',
    },
    title: {
        fontSize: moderateScale(15),
        fontFamily: 'Roboto_700Bold',
        color: '#FFFFFF',
        marginBottom: verticalScale(10),
        textAlign: 'center',
    },
    bodyText: {
        fontSize: moderateScale(12),
        fontFamily: 'Roboto_300Light',
        color: '#FFFFFF',
        textAlign: 'justify',
        lineHeight: moderateScale(20),
    },
    footer: {
        alignItems: 'center',
        justifyContent: 'flex-end',
        paddingBottom: verticalScale(10),
        backgroundColor: '#0E3549',
    },
    rightsText: {
        color: '#FFFFFF',
        fontFamily: 'Roboto_300Light',
        fontSize: moderateScale(10),
        textAlign: 'center',
        marginBottom: verticalScale(-5), // ajuste para que no se vea cortado
    },
});


export default termsAndConditions;