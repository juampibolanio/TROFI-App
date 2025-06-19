import React, { version } from 'react'
import { View, Text, SafeAreaView, StyleSheet, ImageBackground, Image, Pressable, ScrollView } from 'react-native'
import { Link, router, useLocalSearchParams, useRouter } from 'expo-router'
import imagePath from '@/constants/imagePath';
import { moderateScale, verticalScale } from 'react-native-size-matters';
import { Ionicons } from '@expo/vector-icons';
import { useFonts } from '@expo-google-fonts/roboto';
import fonts from '@/constants/fonts';
import UserReview from '@/components/userReview';

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
        categoria: 'Herrería',
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
        categoria: 'Cuidados',
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
        descripcion: 'Excelente profesional, muy atento.',
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


const UserDetail = () => {
    const { id } = useLocalSearchParams();
    const [fontsLoaded] = useFonts(fonts); //carga de fuentes

    // Buscar perfil seleccionado
    const perfil = perfiles.find((p) => p.id === Number(id));

    if (!perfil) {
        return <Text>Perfil no encontrado</Text>; //falta estilar este texto
    }

    // Filtrado de reseñas por id 
    const reseñasUsuario = reseñas.filter(r => r.idUsuarioDestino === perfil.id);

    const reseñasConAutor = reseñas.map((reseña) => { //Funcion para poner acceder a los datos del usuario q hizo la reseña para mostrarla.
        const autor = perfiles.find((perfil) => perfil.id === reseña.idUsuarioAutor);

        return {
            ...reseña,
            autorNombre: autor?.nombre,
            autorImagen: autor?.imagen,
        };
    });

    const reseñasConAutorFiltradas = reseñasConAutor.filter(r => r.idUsuarioDestino === perfil.id); //filtrar las reseñas para q coincidan con el perfil al q están asociadas.


    return (
        <SafeAreaView style={styles.container}>
            <ImageBackground
                source={imagePath.backgroundUDetails}
                style={styles.overlay}
                resizeMode='cover'
            >

                {/*--------------------------- HEADER --------------------------- */}
                <View style={styles.header}>
                    <Image source={perfil.imagen} style={styles.imagen} />

                    <View style={styles.infoContainer}>
                        <Text style={styles.username}>{perfil.nombre}</Text>

                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <Ionicons name="location-outline" size={14} color="white" style={{ marginRight: 4 }} />
                            <Text style={styles.ubication}>{perfil.ubicacion}</Text>
                        </View>

                        <Text style={styles.jobDescription}>{perfil.descripcionLaboral}</Text>

                        <Pressable style={styles.sendMessageBottom}>
                            <Ionicons name='send' size={15} color={'#0E3549'} style={styles.sendIcon} />
                            <Text style={styles.sendText}>Enviar mensaje</Text> {/*DAR FUNCIONALIDAD */}
                        </Pressable>
                    </View>
                </View>

                {/*--------------------------- BODY --------------------------- */}
                <View style={styles.body}>

                    <View style={styles.descriptionOverlay}>
                        <View style={styles.description}>
                            <Text style={styles.descriptionTitle}>Descripción</Text>

                            <Text style={styles.descriptionText}>{perfil.descripcion}</Text>
                        </View>
                    </View>

                    <View style={styles.scoreOverlay}>
                        <View style={styles.score}>
                            <Text style={styles.scoreTitle}>Puntuación</Text>

                            <View style={styles.scoreContainer}>
                                <Text style={styles.scoreNumber}>{perfil.puntaje}</Text>

                                <Ionicons name="star-outline" size={30} color="#0E3549" style={styles.starIcon} />
                            </View>
                        </View>
                    </View>

                </View>

                {/*--------------------------- FOOTER --------------------------- */}
                <View style={styles.footer}>

                    <View style={styles.profileBottomsContainer}>

                        <Pressable
                            style={({ pressed }) => [styles.workGalery, pressed && { opacity: 0.5 }]}
                            onPress={() => router.push({ pathname: "/(main)/(tabs)/search/[id]/reviewDetail", params: { id: String(id) } })} /*Pasar push a funcion aparte */
                        >
                            <Text style={styles.textBottom}>Reseñas de la comunidad</Text>
                        </Pressable>

                        <Pressable
                            style={({ pressed }) => [styles.workGalery, pressed && { opacity: 0.5 }]}
                            onPress={() => router.push({ pathname: "/(main)/(tabs)/search/[id]/userGalery", params: { id: String(id) } })} /*Pasar router push a funcion aparte */
                        >
                            <Text style={styles.textBottom}>Galería de trabajo</Text>
                        </Pressable>
                    </View>

                    <ScrollView>
                        <Pressable style={styles.reviewContainer} onPress={() => router.push({ pathname: "/(main)/(tabs)/search/[id]/reviewDetail", params: { id: String(id) } })} /*Pasar push a funcion aparte */>

                            {reseñasConAutorFiltradas.map((r, index) => (
                                <UserReview
                                    key={index}
                                    profileImage={r.autorImagen}
                                    username={`${r.autorNombre}`}
                                    description={r.descripcion}
                                    score={r.score}
                                />
                            ))}

                        </Pressable>
                    </ScrollView>
                </View>
            </ImageBackground>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#0E3549',
    },

    overlay: {
        flex: 1,
    },

    /* ----------------------------------- HEADER -----------------------------------*/

    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        padding: moderateScale(20),
    },

    imagen: {
        width: moderateScale(115),
        height: moderateScale(115),
        borderRadius: moderateScale(60),
        borderColor: '#FFFFFF',
        borderWidth: 4
    },

    infoContainer: {
        flex: 1,
        justifyContent: 'center',
        gap: moderateScale(5),
        marginLeft: moderateScale(15),
    },
    username: {
        fontSize: moderateScale(22),
        color: '#FFFFFF',
        fontFamily: 'RobotoRegular'
    },
    ubication: {
        fontSize: moderateScale(14),
        color: '#FFFFFF',
        fontFamily: 'RobotoRegular'

    },
    jobDescription: {
        fontSize: moderateScale(12),
        color: '#FFFFFF',
        fontFamily: 'RobotoRegular'
    },

    sendMessageBottom: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#D9D9D9',
        paddingVertical: moderateScale(6),
        paddingHorizontal: moderateScale(13),
        borderRadius: moderateScale(15),
        marginTop: moderateScale(5),
        alignSelf: 'flex-start',
        gap: moderateScale(6)

    },

    sendText: {
        color: '#000000',
        fontSize: moderateScale(12),
        fontWeight: 'bold',
        fontFamily: 'RobotoRegular'
    },

    sendIcon: {
    },

    /* ----------------------------------- BODY -----------------------------------*/
    body: {
        flexDirection: 'row',
        justifyContent: 'center',
        gap: moderateScale(10),
    },

    descriptionOverlay: {
        backgroundColor: '#696969',
        paddingVertical: moderateScale(4),
        paddingHorizontal: moderateScale(5),
        borderRadius: moderateScale(15)
    },

    scoreOverlay: {
        backgroundColor: '#696969',
        paddingVertical: moderateScale(4),
        paddingHorizontal: moderateScale(5),
        borderRadius: moderateScale(10)
    },

    description: {
        width: moderateScale(200),
        height: moderateScale(250),
        backgroundColor: '#D9D9D9',
        padding: moderateScale(10),
        borderRadius: moderateScale(10)
    },

    descriptionTitle: {
        borderRadius: moderateScale(10),
        padding: moderateScale(3),
        fontSize: moderateScale(20),
        fontWeight: 'bold'
    },

    descriptionText: {
        backgroundColor: 'transparent',
        fontFamily: 'RobotoLight',
        fontSize: moderateScale(14),
        textAlign: 'justify'
    },

    score: {
        width: moderateScale(115),
        height: moderateScale(250),
        backgroundColor: '#D9D9D9',
        padding: moderateScale(10),
        borderRadius: moderateScale(10)
    },

    scoreTitle: {
        borderRadius: moderateScale(10),
        padding: moderateScale(3),
        fontSize: moderateScale(15),
        fontWeight: 'bold',
        textAlign: 'center'
    },

    scoreContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center'
    },

    scoreNumber: {
        fontSize: moderateScale(32),
        fontFamily: 'RobotoLight'
    },
    starIcon: {
    },
    /* ----------------------------------- FOOTER -----------------------------------*/

    footer: {
        flex: 1,
        justifyContent: 'center',
    },

    profileBottomsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: moderateScale(15)
    },

    communityReview: {
        padding: moderateScale(12),
        backgroundColor: '#D9D9D9',
        borderRadius: moderateScale(12)
    },

    workGalery: {
        padding: moderateScale(12),
        backgroundColor: '#D9D9D9',
        borderRadius: moderateScale(12)
    },

    textBottom: {
        color: '#000000',
        fontSize: moderateScale(12),
        fontFamily: 'RobotoRegular',
        fontWeight: 'bold'
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
        gap: moderateScale(10)
    },
})

export default UserDetail;