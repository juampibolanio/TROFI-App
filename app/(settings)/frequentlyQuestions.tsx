import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    SafeAreaView,
    Image,
    TouchableOpacity,
    LayoutAnimation,
    Platform,
    UIManager 
} from 'react-native';
import { moderateScale, verticalScale } from 'react-native-size-matters';
import { Roboto_300Light, Roboto_400Regular, Roboto_700Bold, useFonts } from '@expo-google-fonts/roboto';
import imagePath from '@/constants/imagePath';

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

    // STATE de las preguntas 
    const [faqs, setFaqs] = useState<FAQItem[]>([
        {
            question: "¿Qué es TROFI?",
            answer: "TROFI es la solución ideal para conectar profesionales con quienes necesitan sus servicios de manera rápida y sencilla. Con nuestra app, puedes encontrar expertos en distintos oficios, como electricistas, plomeros, carpinteros y muchos más.",
            expanded: true // Mostrar esta expandida por defecto
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
        }
    ]);

    // Function  alternar la expansión de un FAQ  
    const toggleFAQ = (index: number) => {
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
        
        // crea una copia del estado actual
        const updatedFaqs = faqs.map((faq, i) => ({
            ...faq,
            expanded: i === index ? !faq.expanded : false
             // solo el elemento clickeado cambia su estado, los demás se cierran 
        }));
        
        setFaqs(updatedFaqs);
    };

    if (!fontsLoaded) return null;

    return (
        <SafeAreaView style={styles.container}>
            {/* Cabecera */}
            <View style={styles.header}>
                <Image source={imagePath.icon} style={styles.icon} />
            </View>
            {/* Contenido principal */}
            <View style={styles.content}>
                
                {/* Lista de preguntas frecuentes */}
                <View style={styles.faqContainer}>
                    {faqs.map((faq, index) => (
                        <View key={index} style={styles.faqItem}>
                            <TouchableOpacity 
                                style={styles.faqQuestion} 
                                onPress={() => toggleFAQ(index)}
                                activeOpacity={0.7}
                            >
                                <Text style={styles.faqQuestionText}>{faq.question}</Text>
                            </TouchableOpacity>
                            
                            {faq.expanded && (
                                <View style={styles.faqAnswer}>
                                    <Text style={styles.faqAnswerText}>{faq.answer}</Text>
                                </View>
                            )}
                        </View>
                    ))}
                </View>

                {/*Pie de pagina */}
                <View style={styles.footer}>
                    <Text style={styles.rightsText}>©2025 TROFI. Todos los derechos reservados.</Text>
                </View>
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
        paddingHorizontal: moderateScale(20),
        paddingTop: verticalScale(20),
    },
    title: {
        color: '#FFFFFF',
        fontSize: moderateScale(24),
        fontFamily: 'Roboto_700Bold',
        marginBottom: verticalScale(30),
    },
    faqContainer: {
        width: '100%',
        marginBottom: verticalScale(20),
    },
    faqItem: {
        marginBottom: verticalScale(15),
        borderRadius: moderateScale(10),
        overflow: 'hidden',
    },
    faqQuestion: {
        backgroundColor: '#E5E5E5',
        paddingVertical: verticalScale(15),
        paddingHorizontal: moderateScale(20),
        borderRadius: moderateScale(10),
    },
    faqQuestionText: {
        color: '#0E3549',
        fontFamily: 'Roboto_700Bold',
        fontSize: moderateScale(16),
    },
    faqAnswer: {
        backgroundColor: 'rgba(229, 229, 229, 0.2)',
        padding: moderateScale(20),
        marginTop: verticalScale(5),
        borderRadius: moderateScale(10),
    },
    faqAnswerText: {
        color: '#FFFFFF',
        fontFamily: 'Roboto_400Regular',
        fontSize: moderateScale(14),
        lineHeight: verticalScale(20),
    },
    footer: {
        marginTop: 'auto',
        paddingBottom: verticalScale(20),
        alignItems: 'center',
    },
    rightsText: {
        color: '#FFFFFF',
        fontFamily: 'Roboto_300Light',
        fontSize: moderateScale(12),
        marginTop: verticalScale(10),
    },
});



// 1era versión de FAQ
// - Se agregaron preguntas frecuentes con animación de expansión
// Posibilidad de agregar más estilos, mas preguntas y una barra de navegación vertical
// Completando la función de FAQ.
export default FrequentlyQuestions;