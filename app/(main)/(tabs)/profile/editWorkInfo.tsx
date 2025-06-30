import fonts from '@/constants/fonts';
import imagePath from '@/constants/imagePath';
import { useFonts } from '@expo-google-fonts/roboto';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import React, { useState } from 'react';
import {
    View,
    Text,
    ImageBackground,
    Pressable,
    SafeAreaView,
    StyleSheet,
    Image,
    Modal
} from 'react-native';
import { moderateScale } from 'react-native-size-matters';
import ButtonComponent from '@/components/atoms/ButtonComponent';

const editWorkInfo = () => {
    //const [job, setJob] = useState({ id: 1, title: 'electricista' });
    // para mostrar el trabajo actual, si es que se tiene uno

    return (
        <SafeAreaView style={styles.container}>
            <ImageBackground
                style={styles.overlay}
                source={imagePath.editWorkInfoBackground}
                resizeMode="cover"
            >
                {/* Header */}
                <View style={styles.header}>
                    <Image source={imagePath.icon} style={styles.iconStyle} resizeMode="contain" />
                </View>

                {/* Botones */}
                <View style={styles.containerButton}>
                    <ButtonComponent
                        title="Editar información laboral"
                        //={`Editar información laboral /(${job.title})`} <-- para mostrar el trabajo actual
                        iconName="pencil"
                        onPress={() => router.push('/profile/editEmploymentInfo')}
                    />

                    <ButtonComponent title="Guardar y actualizar" iconName="save-outline" />
                </View>

                <View style={styles.containerButton}>
                    <ButtonComponent title="Cancelar" iconName="exit-outline" />
                </View>
            </ImageBackground>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: { 
        flex: 1, 
        backgroundColor: '#0E3549' 
    },
    overlay: { 
        flex: 1, 
        justifyContent: 'space-between' 
    },
    header: {
        alignItems: 'center',
        gap: moderateScale(20),
        marginBottom: moderateScale(40),
        paddingTop: moderateScale(10),
    },
    iconStyle: {
        width: moderateScale(50),
        height: moderateScale(50),
    },
    containerButton: {
        padding: moderateScale(50),
        gap: moderateScale(20),
    },
});

export default editWorkInfo;