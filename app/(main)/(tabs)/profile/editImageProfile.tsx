import fonts from '@/constants/fonts';
import imagePath from '@/constants/imagePath';
import { useFonts } from '@expo-google-fonts/roboto';
import { Ionicons } from '@expo/vector-icons';
import { router, useRouter } from 'expo-router';
import { useSearchParams } from 'expo-router/build/hooks';
import React, { useState } from 'react';
import {
    View,
    Text,
    FlatList,
    ImageBackground,
    Pressable,
    SafeAreaView,
    ScrollView,
    TextInput,
    StyleSheet,
    Image,
    Modal
} from 'react-native';
import { moderateScale, scale } from 'react-native-size-matters';
import ButtonComponent from '@/components/atoms/ButtonComponent';


const editImageProfile = () => {

    return (
        <>

        <SafeAreaView style={styles.container}>
            <ImageBackground style={styles.overlay} source={imagePath.editImageProfileBackground} resizeMode="cover">

                {/* HEADER */}
                    <View style={styles.header}>
                        <Image source={imagePath.icon} style={styles.iconStyle} resizeMode="contain" />
                            <Text style={styles.editionText}>
                                Foto de perfil actual
                            </Text>
                            <Image source={imagePath.editProfileImage} style={styles.userImage} resizeMode="contain" />
                    </View>

                {/* BODY */}
                <View style={styles.containerButton}>
                    <ButtonComponent 
                        title="Subir imagen"
                        iconName="push-outline"
                    />

                    <ButtonComponent 
                        title="Guardar y actualizar"
                        iconName="save-outline"
                    />

                    <ButtonComponent 
                        title="Cancelar"
                        iconName="close-outline"
                    />
                </View>

            </ImageBackground>
        </SafeAreaView>

        </>
    )
}

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
    paddingTop: moderateScale(10)
},
    iconStyle: {
    width: moderateScale(50),
    height: moderateScale(50),
},
editionText: {
    textAlign: "center",
    fontSize: moderateScale(25),
    fontFamily: 'Roboto_300Light',
    color: '#FFFFFF',
    marginRight: moderateScale(5),
    },
userImage: {
    width: moderateScale(250),
    height: moderateScale(250),
    borderRadius: moderateScale(155),
    borderWidth: 6,
    borderColor: '#FFFFFF',
},
containerButton: {
    padding: moderateScale(50),
    gap: moderateScale(20)
},
});

export default editImageProfile;