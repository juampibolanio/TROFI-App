import { useState, useRef } from 'react';
import {
    View,
    Text,
    StyleSheet,
    SafeAreaView,
    Image,
    TouchableOpacity,
    LayoutAnimation,
    Platform,
    UIManager,
    ScrollView,
    Animated
} from 'react-native';
import { moderateScale, verticalScale } from 'react-native-size-matters';
import { Roboto_300Light, Roboto_400Regular, Roboto_700Bold, useFonts } from '@expo-google-fonts/roboto';
import imagePath from '@/constants/imagePath';
import { Ionicons } from '@expo/vector-icons';

// habilitar animaciones en Android
if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
}

type FAQItem = {
    question: string;
    answer: string;
    expanded: boolean;
};

const FrequentlyQuestions = () => {
    const [fontsLoaded] = useFonts({
        Roboto_400Regular,
        Roboto_700Bold,
        Roboto_300Light,
    });

    const [faqs, setFaqs] = useState<FAQItem[]>([
        {
            question: "¿Qué es TROFI?",
            answer: "TROFI es la solución ideal para conectar profesionales con quienes necesitan sus servicios de manera rápida y sencilla. Con nuestra app, puedes encontrar expertos en distintos oficios, como electricistas, plomeros, carpinteros y muchos más.",
            expanded: false
        },
        {
            question: "¿Cómo funciona?",
            answer: "1. Descarga la app TROFI\n2. Regístrate como usuario o profesional\n3. Busca servicios o ofrece tus habilidades\n4. Conéctate y agenda citas directamente",
            expanded: false
        },
        {
            question: "¿Qué necesito para ofrecer mi trabajo?",
            answer: "Para ofrecer tus servicios necesitas:\n- Registrarte como profesional\n- Completar tu perfil con tus habilidades\n- Subir documentos que acrediten tu experiencia profesional\n- Establecer tu disponibilidad horaria",
            expanded: false
        },
        {
            question: "¿Cómo contacto a un profesional?",
            answer: "Puedes contactar a profesionales o clientes:\n1. Buscando en el directorio de servicios\n2. Seleccionando el profesional que necesites\n3. Enviando un mensaje directo a través de la app\n4. Programando una cita en el calendario integrado\n5. Cada profesional tiene su propio perfil donde puedes ver sus servicios, calificaciones y comentarios de otros usuarios.",
            expanded: false
        },
    ]);


    const animatedHeights = useRef<Animated.Value[]>(faqs.map(() => new Animated.Value(0))).current;  //Aca se crea un Animated.Value para cada FAQ . Esto es una  función para alternar la expansión de las preguntas frecuentes

    const toggleFAQ = (index: number) => {
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut); // Configurar la animación de diseño para que sea suave
        const updatedFaqs = faqs.map((faq, i) => ({
            ...faq,
            expanded: i === index ? !faq.expanded : false // Alternar la expansión solo para el FAQ seleccionado
        }));

        // Actualizar las alturas animadas según el estado expandido
        updatedFaqs.forEach((faq, i) => {
            Animated.timing(animatedHeights[i], {
                toValue: faq.expanded ? 1 : 0,
                duration: 300,
                useNativeDriver: false,
            }).start();
        });

        setFaqs(updatedFaqs);
    };

    if (!fontsLoaded) return null;

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <Image source={imagePath.icon} style={styles.icon} />
            </View>

            <View style={styles.content}>
                <ScrollView>
                    <View style={styles.faqContainer}>
                        {faqs.map((faq, index) => {
                            const height = animatedHeights[index].interpolate({ // esto se utiliza para animar la altura de la respuesta
                                inputRange: [0, 1],
                                outputRange: [0, 150], 
                                extrapolate: 'clamp'
                            });

                            const opacity = animatedHeights[index].interpolate({ // esto se utiliza para animar la opacidad 
                                inputRange: [0, 1],
                                outputRange: [0, 1]
                            });

                            return (
                                <View key={index} style={styles.faqItem}>
                                    <TouchableOpacity
                                        style={styles.faqQuestion}
                                        onPress={() => toggleFAQ(index)}
                                        activeOpacity={0.7}
                                    >
                                        <Ionicons
                                            name={faq.expanded ? "chevron-up" : "chevron-down"}
                                            size={20}
                                            color="#0E3549"
                                            style={{ marginLeft: 10 }}
                                        />
                                        <Text style={styles.faqQuestionText}>{faq.question}</Text>
                                    </TouchableOpacity>


                                    <Animated.View style={[
                                        styles.faqAnswer,
                                        { height, opacity, marginBottom: faq.expanded ? verticalScale(10) : 0 } // acá se añade margen inferior solo si está expandido
                                    ]}>
                                        <ScrollView>
                                            <Text style={styles.faqAnswerText}>{faq.answer}</Text>
                                        </ScrollView>
                                    </Animated.View>

                                </View>
                            );
                        })}
                    </View>
                </ScrollView>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#0E3549',
    },
    header: {
        height: verticalScale(80),
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#0E3549',
    },
    icon: {
        width: moderateScale(50),
        height: moderateScale(50),
        resizeMode: 'contain',
    },
    content: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'flex-start',
        paddingHorizontal: moderateScale(15),
        paddingTop: verticalScale(20),
    },
    faqContainer: {
        width: '100%',
    },
    faqItem: {
        borderRadius: moderateScale(10),
        overflow: 'hidden',
    },
    faqQuestion: {
        backgroundColor: '#E5E5E5',
        paddingVertical: verticalScale(10),
        paddingHorizontal: moderateScale(15),
        borderRadius: moderateScale(10),
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        gap: moderateScale(10),
    },
    faqQuestionText: {
        color: '#0E3549',
        fontFamily: 'Roboto_700Bold',
        fontSize: moderateScale(14),
        flexShrink: 1,
    },
    faqAnswer: {
        backgroundColor: 'rgba(229, 229, 229, 0.2)',
        paddingVertical: verticalScale(10),
        paddingHorizontal: moderateScale(15),
        borderRadius: moderateScale(10),
        overflow: 'hidden',
    },
    faqAnswerText: {
        color: '#FFFFFF',
        fontFamily: 'Roboto_400Regular',
        fontSize: moderateScale(14),
        lineHeight: verticalScale(20),
        textAlign: 'justify',
    },
});

export default FrequentlyQuestions;