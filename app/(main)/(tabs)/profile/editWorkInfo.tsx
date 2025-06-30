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



return (
<SafeAreaView style={styles.container}>
    <ImageBackground 
            style={styles.overlay} 
            source={imagePath.editWorkInfoBackground} 
            resizeMode="cover">

    <View style={styles.header}>
        <Image 
            source={imagePath.icon} 
            style={styles.iconStyle} 
            resizeMode="contain" 
        />
    </View>

    <View style={styles.containerButton}>
        
        <ButtonComponent 
            title="Editar información de empleo 1"
            iconName="pencil"
        />

        <ButtonComponent 
            title="Editar información de empleo 2"
            iconName="pencil"
        />

        <ButtonComponent 
            title="Agregar nuevo oficio"
            iconName="pencil"
        />

        <ButtonComponent 
            title="Guardar y actualizar"
            iconName="save-outline"
        />

    </View>

    <View style={styles.containerButton}>
        <ButtonComponent 
            title="Cancelar"
            iconName="exit-outline"
        />
    </View>


    </ImageBackground>
</SafeAreaView>
    );
};

const styles = StyleSheet.create({
container: {
    flex: 1,
    backgroundColor: '#0E3549',
},
overlay: {
    justifyContent: "space-between",
    flex: 1,
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
