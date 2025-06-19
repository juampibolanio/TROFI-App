import {
    View,
    Text,
    SafeAreaView,
    StyleSheet,
    Image,
    ImageBackground,
} from 'react-native';
import React from 'react';
import imagePath from '@/constants/imagePath';
import { moderateScale } from 'react-native-size-matters';
import { Roboto_300Light, Roboto_400Regular, Roboto_700Bold, useFonts } from '@expo-google-fonts/roboto';
import SettingsButton from '@/components/SettingsButton';

const Settings = () => {
    const [fontsLoaded] = useFonts({
        Roboto_400Regular,
        Roboto_700Bold,
        Roboto_300Light
    });

    if (!fontsLoaded) return null;

    return (
        <SafeAreaView style={styles.container}>
            <ImageBackground
                source={imagePath.backgroundSettings}
                resizeMode='cover'
                style={styles.overlay}
            >

                {/* HEADER */}
                <View style={styles.header}>
                    <Image source={imagePath.icon} style={styles.iconStyle} resizeMode='contain' />
                </View>

                {/* BODY */}
                <View style={styles.body}>
                    <SettingsButton title="Contacto" iconName="mail-open-sharp" route="/settings/contact" />
                    <SettingsButton title="Preguntas frecuentes" iconName="help" route="/settings/frequentlyQuestions" />
                    <SettingsButton title="Acerca de TROFI" iconName="information-circle" route="/settings/aboutTrofi" />
                    <SettingsButton title="Reportar un bug" iconName="bug-outline" route="/settings/reportBug" />
                    <SettingsButton title="Términos y condiciones" iconName="document-text-outline" route="/settings/termsAndConditions" />
                </View>

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
});

export default Settings;
