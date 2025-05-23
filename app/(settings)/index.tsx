import {
    View,
    Text,
    SafeAreaView,
    StyleSheet,
    Image,
    Switch,
    ImageBackground,
    TouchableOpacity,
    Pressable,
    TextInput,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    TouchableWithoutFeedback,
    Keyboard
} from 'react-native';
import React, { useState } from 'react';
import imagePath from '@/constants/imagePath';
import { moderateScale, scale, verticalScale } from 'react-native-size-matters';
import { Roboto_300Light, Roboto_400Regular, Roboto_700Bold, useFonts } from '@expo-google-fonts/roboto';
import SettingsButton from '@/components/SettingsButton';
import { router } from 'expo-router';
import { CustomTextInput } from '@/components/atoms/CustomTextInput';

const Settings = () => {
    const [fontsLoaded] = useFonts({
            Roboto_400Regular,
            Roboto_700Bold,
            Roboto_300Light
        });

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
                <SettingsButton iconName="mail-open-sharp" title="Contacto" onPress={() => {router.push('/(settings)/contact') }} />
                <SettingsButton title="Preguntas frecuentes" onPress={() => {router.push('/(settings)/frequentlyQuestions') }} />
                    {/*Falta hacer el redireccionamiento hacia las otras vistas*/}
                <SettingsButton title="Acerca de TROFI" onPress={() => { }} />
                <SettingsButton title="Reportar un bug" onPress={() => { }} />
                <SettingsButton title="Términos y condiciones" onPress={() => { }} />
            </View>





            {/* FOOTER */}
            <View style={styles.footer}>
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
    header: {

    },
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

export default Settings 