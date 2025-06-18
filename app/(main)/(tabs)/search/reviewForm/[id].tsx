import {
    View, Text, ImageBackground, StyleSheet, Image, TextInput,
    Pressable, KeyboardAvoidingView, Platform, ScrollView,
    TouchableWithoutFeedback,
    Keyboard
} from 'react-native'
import React, { useState } from 'react'
import { router, useLocalSearchParams } from 'expo-router'
import { SafeAreaView } from 'react-native-safe-area-context';
import imagePath from '@/constants/imagePath';
import { moderateScale, verticalScale } from 'react-native-size-matters';
import StarRating from 'react-native-star-rating-widget';

/*Acá cargo perfiles en un array, a falta de backend tengo q simular datos */
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



const ReviewForm = () => {
    const { id } = useLocalSearchParams();
    const [rating, setRating] = useState(0);
    const [reseña, setReseña] = useState("");

    const perfil = perfiles.find((p) => p.id === Number(id));

    return (
        <SafeAreaView style={styles.container}>
            <KeyboardAvoidingView
                style={{ flex: 1 }}
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 20}
            >
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                    <ImageBackground
                        style={styles.overlay}
                        source={imagePath.backgroundSRDetails}
                        resizeMode='cover'
                    >
                        <ScrollView
                            contentContainerStyle={{ flexGrow: 1 }}
                            keyboardShouldPersistTaps="handled"
                        >
                            <View style={styles.header}>
                                <Image source={imagePath.icon} style={styles.logo} />
                                <Image source={perfil?.imagen} style={styles.userImage} resizeMode='contain' />
                            </View>

                            <View style={styles.body}>
                                <View style={styles.bodyElements}>
                                    <View style={styles.starAndTitleContainer}>
                                        <Text style={styles.reviewTitle}>
                                            ¿Cómo fueron los servicios de {perfil?.nombre}?
                                        </Text>
                                        <StarRating
                                            rating={rating}
                                            onChange={setRating}
                                            maxStars={5}
                                            starSize={32}
                                            color="#0E3549"
                                            enableHalfStar={true}
                                        />
                                    </View>

                                    <View style={styles.textAreaAndButtons}>
                                        <TextInput
                                            style={styles.textArea}
                                            multiline
                                            numberOfLines={5}
                                            placeholder='Escribe una reseña...'
                                            placeholderTextColor="#999"
                                            value={reseña}
                                            onChangeText={setReseña}
                                        />

                                        <View style={styles.buttonsContainer}>
                                            
                                            <Pressable style={({ pressed }) => [
                                                styles.cancelButton,
                                                pressed && { opacity: 0.5 }
                                            ]} onPress={() => { router.back() }}>
                                                <Text style={styles.cancelButtonText}>Cancelar</Text>
                                            </Pressable>

                                            <Pressable style={({ pressed }) => [
                                                styles.sendReviewButton,
                                                pressed && { opacity: 0.5 }
                                            ]} onPress={() => { router.back() }}
                                            >
                                                <Text style={styles.sendReviewButtonText}>Enviar Reseña</Text>
                                            </Pressable>

                                        </View>
                                    </View>
                                </View>
                            </View>
                        </ScrollView>
                    </ImageBackground>
                </TouchableWithoutFeedback>
            </KeyboardAvoidingView>
        </SafeAreaView >
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#0E3549',
    },
    overlay: {
        flex: 1,
    },
    header: {
        justifyContent: 'center',
        alignItems: 'center',
        gap: moderateScale(20),
        paddingTop: verticalScale(30),
        paddingBottom: verticalScale(15),
    },
    logo: {
        width: moderateScale(38),
        height: moderateScale(40),
    },
    userImage: {
        width: moderateScale(120),
        height: moderateScale(120),
        borderRadius: moderateScale(60),
        borderColor: '#FFFFFF',
        borderWidth: 4,
    },
    body: {
        backgroundColor: '#D9D9D9',
        marginHorizontal: moderateScale(15),
        borderTopLeftRadius: moderateScale(60),
        borderTopRightRadius: moderateScale(60),
        flex: 1,
        paddingTop: moderateScale(30),
        paddingBottom: moderateScale(20),
    },
    bodyElements: {
        alignItems: 'center',
        gap: moderateScale(10),
    },
    starAndTitleContainer: {
        alignItems: 'center',
        gap: moderateScale(15),
        paddingHorizontal: moderateScale(20),
    },
    reviewTitle: {
        fontSize: moderateScale(17),
        fontWeight: 'bold',
        textAlign: 'center',
        color: '#0E3549',
    },
    textAreaAndButtons: {
        width: '100%',
        alignItems: 'center',
        marginTop: moderateScale(20),
    },
    textArea: {
        width: '85%',
        height: verticalScale(100),
        borderWidth: 3,
        borderColor: '#0E3549',
        borderRadius: moderateScale(35),
        paddingHorizontal: moderateScale(20),
        paddingVertical: moderateScale(12),
        fontSize: moderateScale(14),
        color: '#0E3549',
        backgroundColor: '#FFFFFF',
        textAlignVertical: 'top',
        textAlign: 'justify',
    },
    buttonsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '70%',
        marginTop: moderateScale(20),
        gap: moderateScale(12),
    },
    cancelButton: {
        backgroundColor: '#DD4B4B',
        borderRadius: moderateScale(20),
        paddingVertical: moderateScale(10),
        paddingHorizontal: moderateScale(20),
    },
    cancelButtonText: {
        color: '#FFFFFF',
        fontSize: moderateScale(14),
        fontWeight: 'bold',
        textAlign: 'center',
    },
    sendReviewButton: {
        backgroundColor: '#0E3549',
        borderRadius: moderateScale(20),
        paddingVertical: moderateScale(10),
        paddingHorizontal: moderateScale(20),
    },
    sendReviewButtonText: {
        color: '#FFFFFF',
        fontSize: moderateScale(14),
        fontWeight: 'bold',
        textAlign: 'center',
    },
});

export default ReviewForm;