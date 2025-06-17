// Librerías de React Native
import {
    View,
    Text,
    SafeAreaView,
    StyleSheet,
    Image,
    ImageBackground,
} from 'react-native';
// React y estados
import React from 'react';
import imagePath from '@/constants/imagePath';
// Escalado responsive
import { moderateScale } from 'react-native-size-matters';
// Fuentes personalizadas
import { Roboto_300Light, Roboto_400Regular, Roboto_700Bold, useFonts } from '@expo-google-fonts/roboto';
// Botón personalizado para ítems de configuración
import SettingsButton from '@/components/SettingsButton';
// Navegación con Expo Router
import { router } from 'expo-router';

const Settings = () => {
    // Cargamos fuentes Roboto
    const [fontsLoaded] = useFonts({
        Roboto_400Regular,
        Roboto_700Bold,
        Roboto_300Light
    });

    // Si las fuentes aún no cargaron, no renderiza nada
    if (!fontsLoaded) return null;

    return (
        <SafeAreaView style={styles.container}>
            <ImageBackground
                source={imagePath.backgroundFeatured}
                resizeMode='stretch'
                style={styles.overlay}
            >
                {/* HEADER */}
                <View style={styles.header}>
                    <Image source={imagePath.icon} style={styles.iconStyle} resizeMode='contain'/>
                </View>

                {/* BODY */}
                <View style={styles.body}>
                <SettingsButton
                    iconName="mail-open-sharp"
                    title="Contacto"
                    onPress={() => router.push('/contact')}
                />
                <SettingsButton
                    title="Preguntas frecuentes"
                    onPress={() => router.push('/frequentlyQuestions')}
                />
                <SettingsButton
                    title="Acerca de TROFI"
                    onPress={() => router.push('/aboutTrofi')}
                />
                <SettingsButton
                    title="Reportar un bug"
                    onPress={() => router.push('/reportBug')}
                />
                <SettingsButton
                    title="Términos y condiciones"
                    onPress={() => router.push('/termsAndConditions')}
                />

                </View>

                {/* FOOTER */}
                <View style={styles.footer} />
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
        gap: moderateScale(25)
    },
    footer: {
        flex: 1,
        alignItems: 'center'
    }
});

export default Settings;
