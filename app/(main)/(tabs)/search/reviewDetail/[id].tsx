import UserReview from '@/components/userReview';
import UserReviewDetail from '@/components/userReviewDetail';
import fonts from '@/constants/fonts';
import imagePath from '@/constants/imagePath';
import { useFonts } from '@expo-google-fonts/roboto';
import { Ionicons } from '@expo/vector-icons';
import { router, useLocalSearchParams } from 'expo-router';
import React from 'react'
import { View, StyleSheet, ImageBackground, ScrollView, Pressable, Text } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context';
import { moderateScale, verticalScale } from 'react-native-size-matters';

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


/*Aca hay reseñas cargadas para simular */
const reseñas = [
    {
        idUsuarioDestino: 1, // a quién reseñan
        idUsuarioAutor: 7,   // quién hace la reseña
        descripcion: 'Excelente profesional, muy atento',
        score: 8.5,
    },
    {
        idUsuarioDestino: 1,
        idUsuarioAutor: 6,
        descripcion: 'Rápido y eficiente.',
        score: 9.0,
    },
    {
        idUsuarioDestino: 3,
        idUsuarioAutor: 5,
        descripcion: 'Trabajo prolijo y puntual.',
        score: 9.2,
    },

];

const reviewDetail = () => {
    const { id } = useLocalSearchParams();

    const [fontsLoaded] = useFonts(fonts); //carga de fuentes

    // Buscar perfil seleccionado
    const perfil = perfiles.find((p) => p.id === Number(id));

    // Filtrado de reseñas por id 
    const reseñasUsuario = perfil
        ? reseñas.filter(r => r.idUsuarioDestino === perfil.id)
        : [];

    const reseñasConAutor = reseñas.map((reseña) => { //Funcion para poner acceder a los datos del usuario q hizo la reseña para mostrarla.
        const autor = perfiles.find((perfil) => perfil.id === reseña.idUsuarioAutor);

        return {
            ...reseña,
            autorNombre: autor?.nombre,
            autorImagen: autor?.imagen,
        };
    });

    const reseñasConAutorFiltradas = perfil
        ? reseñasConAutor.filter(r => r.idUsuarioDestino === perfil.id)
        : []; //filtrar las reseñas para q coincidan con el perfil al q están asociadas.


    return (
        <>
            <SafeAreaView style={styles.container}>
                <ImageBackground
                    style={styles.overlay}
                    source={imagePath.backgroundRDetails}
                    resizeMode='cover'
                >
                    <View style={styles.headerContainer}>
                        <Pressable
                            style={({ pressed }) => [
                                styles.backBottom,
                                pressed && { opacity: 0.5 }
                            ]}
                            onPress={() => router.back()}
                        >

                            <Ionicons name="arrow-back" size={28} color="black" />

                        </Pressable>
                        <Text style={styles.title}>Reseñas de {perfil?.nombre}</Text>
                    </View>
                    <ScrollView>
                        <View style={styles.reviewContainer}>

                            {reseñasConAutorFiltradas.map((r, index) => (
                                <UserReviewDetail
                                    key={index}
                                    profileImage={r.autorImagen}
                                    username={`${r.autorNombre}`}
                                    description={r.descripcion}
                                    score={r.score}
                                />
                            ))}
                        </View>
                    </ScrollView>

                    <View style={styles.footerContainer}>
                        <Pressable
                            style={({ pressed }) => [
                                styles.sendReviewButton,
                                pressed && { opacity: 0.5 }
                            ]}
                            onPress={() => router.push({ pathname: "/(main)/(tabs)/search/reviewForm/[id]", params: { id: String(id) } })} /*Pasar push a funcion aparte */
                        >
                            <Text style={styles.sendReviewButtonText}>Reseña a este usuario</Text>
                            <Ionicons name="star-outline" size={24} color="#000" style={{ marginLeft: 8 }} />
                        </Pressable>
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
        flex: 1
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

    reviewContainer: {
        flex: 1,
        paddingVertical: moderateScale(12),
        paddingHorizontal: moderateScale(10),
        marginHorizontal: moderateScale(10),
        borderTopLeftRadius: moderateScale(15),
        borderTopRightRadius: moderateScale(15),
        borderBottomLeftRadius: 0,
        borderBottomRightRadius: 0,
        gap: moderateScale(10),
        marginTop: moderateScale(60)
    },

    footerContainer: {
        padding: moderateScale(12),
        alignItems: 'center',
        justifyContent: 'center',
    },

    sendReviewButton: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: moderateScale(20),
        paddingVertical: moderateScale(10),
        paddingHorizontal: moderateScale(15),
        backgroundColor: '#D9D9D9'
    },

    sendReviewButtonText: {
        textAlign: 'center',
        fontSize: moderateScale(14),
        fontWeight: 'bold',
        fontFamily: 'RobotoLight',
        color: '#000',
    }

})

export default reviewDetail;