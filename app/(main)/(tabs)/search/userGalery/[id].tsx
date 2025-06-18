import React, { useState } from 'react';
import { View, Text, ScrollView, StyleSheet, ImageBackground, Image, Pressable } from 'react-native'; // si es React Native
import { router, useLocalSearchParams, useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import imagePath from '@/constants/imagePath';
import { moderateScale, scale, verticalScale } from 'react-native-size-matters';
import { useFonts } from '@expo-google-fonts/roboto';
import fonts from '@/constants/fonts';
import { Ionicons } from '@expo/vector-icons';

const perfiles = [
    {
        id: 1,
        nombre: 'Facundo Pereyra',
        puntaje: 7.6,
        categoria: 'Plomería',
        ubicacion: 'Resistencia',
        descripcionLaboral: 'Especialista en instalaciones sanitarias y reparación de cañerías.',
        descripcion: 'Soy una persona con años de experiencia.. .. ..',
        imagen: require('@/assets/images/searchImg/usersImg/facPereyra.png')
    },
    {
        id: 2,
        nombre: 'Tomás Álvarez',
        puntaje: 8.2,
        categoria: 'Plomería',
        ubicacion: 'Fontana',
        descripcionLaboral: 'Plomero con más de 10 años de experiencia en mantenimiento de domicilios.',
        descripcion: 'Soy una persona con años de experiencia.. .. ..',
        imagen: require('@/assets/images/searchImg/usersImg/tomasAlvarez.png')
    },
    {
        id: 3,
        nombre: 'Joaquín Sosa',
        puntaje: 9.0,
        categoria: 'Herrero',
        ubicacion: 'Resistencia',
        descripcionLaboral: 'Diseño y fabricación de estructuras metálicas a medida.',
        descripcion: 'Soy una persona con años de experiencia.. .. ..',
        imagen: require('@/assets/images/searchImg/usersImg/joaSosa.png')
    },
    {
        id: 4,
        nombre: 'Nicolás Benítez',
        puntaje: 8.4,
        categoria: 'Electrónica',
        ubicacion: 'Barranqueras',
        descripcionLaboral: 'Reparación de dispositivos electrónicos y placas.',
        descripcion: 'Soy una persona con años de experiencia.. .. ..',
        imagen: require('@/assets/images/searchImg/usersImg/nicoBenitez.png')
    },
    {
        id: 5,
        nombre: 'Leandro Giménez',
        puntaje: 8.4,
        categoria: 'Cuidado de personas',
        ubicacion: 'Puerto vilelas',
        descripcionLaboral: 'Cuidador con experiencia en adultos mayores, atención y acompañamiento.',
        descripcion: 'Soy una persona con años de experiencia.. .. ..',
        imagen: require('@/assets/images/searchImg/usersImg/leaGimenez.png')
    },
    {
        id: 6,
        nombre: 'Lucas López',
        puntaje: 8,
        categoria: 'Herrería',
        ubicacion: 'Resistencia',
        descripcionLaboral: 'Herrero con experiencia ... ... ....',
        descripcion: 'Soy una persona con años de experiencia.. .. ..',
        imagen: require('@/assets/images/searchImg/usersImg/luLopez.png')
    },
    {
        id: 7,
        nombre: 'Hernán Bermudez',
        puntaje: 8,
        categoria: 'Plomería',
        ubicacion: 'Resistencia',
        descripcionLaboral: 'Plomero con experiencia ... ... ....',
        descripcion: 'Soy una persona con años de experiencia.. .. ..',
        imagen: require('@/assets/images/searchImg/usersImg/herBermudez.png')
    },
];

const galeriaPorUsuario: { [id: number]: any[] } = {
    1: [
        require('@/assets/images/galeryUserImg/one.png'),
        require('@/assets/images/galeryUserImg/two.png'),
        require('@/assets/images/galeryUserImg/three.png'),
        require('@/assets/images/galeryUserImg/four.png'),
        require('@/assets/images/featuredImg/electricity.png'),
        require('@/assets/images/featuredImg/masonry.png'),
    ],
    2: [],
    3: [],
    4: []
}


const UserGalery = () => {
    const { id } = useLocalSearchParams();

    const userId = parseInt(id as string);

    const perfil = perfiles.find((p) => p.id === Number(id));

    const userImages = galeriaPorUsuario[userId] || [];

    const haveImages = userImages.length > 0;

    const [fontsLoaded] = useFonts(fonts); //carga de fuentes

    const router = useRouter();



    return (
        <SafeAreaView style={styles.container}>
            <ImageBackground style={styles.overlay} source={imagePath.backgroundGDetails} resizeMode="cover">

                <View style={styles.headerContainer}>
                    <Pressable
                        style={({ pressed }) => [
                            styles.backBottom,
                            pressed && { opacity: 0.5 }
                        ]}
                        onPress={() => router.back()}>

                        <Ionicons name="arrow-back" size={28} color="black" />

                    </Pressable>
                    <Text style={styles.title}>Galería de {perfil?.nombre}</Text>
                </View>


                <ScrollView contentContainerStyle={styles.scrollContent}>
                    <View style={styles.imageContainer}>
                        {haveImages ? (
                            userImages.map((img, index) => (
                                <Image
                                    key={index}
                                    source={img}
                                    style={styles.image}
                                    resizeMode="cover"
                                />
                            ))
                        ) : (
                            <Text style={styles.textNoImage}>No se encontraron imágenes cargadas</Text>
                        )}
                    </View>
                </ScrollView>
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
    },

    headerContainer: {
        position: 'absolute',
        zIndex: 10,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#D9D9D9',
        paddingVertical: moderateScale(6),
        paddingHorizontal: moderateScale(15),
        borderBottomLeftRadius: moderateScale(20),
        borderBottomRightRadius: moderateScale(20),
        minHeight: moderateScale(40),
        alignSelf: 'center',
    },

    backBottom: {
        padding: moderateScale(8),
        marginRight: moderateScale(6),
    },

    title: {
        flex: 1,
        textAlign: 'center',
        fontSize: moderateScale(16),
        fontWeight: 'bold',
        fontFamily: 'RobotoLight',
        color: '#000',
    },

    imageContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
    },

    image: {
        width: scale(125),
        height: scale(200),
        margin: moderateScale(13),
        borderRadius: moderateScale(25),
        borderColor: '#FFFFFF',
        borderWidth: 3
    },

    scrollContent: {
        paddingTop: moderateScale(70),
    },

    textNoImage: {
        color: '#FFFFFF',
        fontSize: moderateScale(16),
        textAlign: 'center',
        marginTop: verticalScale(20)
    },

})

export default UserGalery;
