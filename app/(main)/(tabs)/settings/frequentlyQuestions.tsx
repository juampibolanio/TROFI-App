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
    Animated,
    ImageBackground,
    } from 'react-native';
    import {
    Roboto_300Light,
    Roboto_400Regular,
    Roboto_700Bold,
    useFonts,
    } from '@expo-google-fonts/roboto';
    import { moderateScale, verticalScale } from 'react-native-size-matters';
    import imagePath from '@/constants/imagePath';
    import { Ionicons } from '@expo/vector-icons';

    // animaciones para Android
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
        question: '¿Qué es TROFI?',
        answer:
            'TROFI es la app que conecta trabajadores informales como electricistas, plomeros o ayudantes con personas que necesitan sus servicios. Simple, rápida y confiable.',
        expanded: false,
        },
        {
        question: '¿Cómo puedo registrarme como trabajador?',
        answer:
            'Ingresá a la app, seleccioná "Soy profesional", completá tu perfil, subí tu DNI y experiencia. ¡Listo para ofrecer tus servicios!',
        expanded: false,
        },
        {
        question: '¿Puedo calificar a los trabajadores?',
        answer:
            'Sí. Después de una sesión, podés dejar una reseña y calificación. Así ayudás a otros usuarios a elegir mejor.',
        expanded: false,
        },
        {
        question: '¿Tiene costo publicar mis servicios?',
        answer:
            'No. Publicar tu perfil y servicios es completamente gratis. En el futuro puede haber funciones premium.',
        expanded: false,
        },
        {
        question: '¿Cómo sé si un profesional es confiable?',
        answer:
            'Podés ver calificaciones de otros usuarios, verificar si tiene perfil verificado y revisar fotos o certificados subidos.',
        expanded: false,
        },
        {
        question: '¿Qué hago si tengo problemas con un trabajador?',
        answer:
            'Si tenés inconvenientes con un trabajador, podés reportarlo a través de la app. Nuestro equipo revisará el caso y tomará las medidas necesarias.',
        expanded: false,
        },
        {
        question: '¿Dónde funciona TROFI?',
        answer:
            'Actualmente TROFI funciona única y exclusivamente en Argentina. En el futuro planeamos expandirnos a otros países de Latinoamérica.',
        expanded: false,
        },
    ]);

    const animatedHeights = useRef<Animated.Value[]>(faqs.map(() => new Animated.Value(0))).current;

    const toggleFAQ = (index: number) => {
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
        const updatedFaqs = faqs.map((faq, i) => ({
        ...faq,
        expanded: i === index ? !faq.expanded : false,
        }));

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
        <ImageBackground source={imagePath.backgroundSettings} style={styles.background} resizeMode="cover">
            <View style={styles.header}>
            <Image source={imagePath.icon} style={styles.icon} />
            <Text style={styles.title}>Preguntas Frecuentes</Text>
            </View>

            <ScrollView contentContainerStyle={styles.faqContainer}>
            {faqs.map((faq, index) => {
                const height = animatedHeights[index].interpolate({
                inputRange: [0, 1],
                outputRange: [0, 150],
                extrapolate: 'clamp',
                });

                const opacity = animatedHeights[index].interpolate({
                inputRange: [0, 1],
                outputRange: [0, 1],
                });

                return (
                <View key={index} style={styles.faqItem}>
                    <TouchableOpacity style={styles.faqQuestion} onPress={() => toggleFAQ(index)} activeOpacity={0.8}>
                    <Ionicons name="help-circle-outline" size={20} color="#0E3549" style={{ marginRight: 8 }} />
                    <Ionicons
                        name={faq.expanded ? 'chevron-up' : 'chevron-down'}
                        size={22}
                        color="#0E3549"
                        style={{ marginRight: 8 }}
                    />
                    <Text style={styles.faqQuestionText}>{faq.question}</Text>
                    </TouchableOpacity>

                    <Animated.View
                    style={[
                        styles.faqAnswer,
                        {
                        height,
                        opacity,
                        marginBottom: faq.expanded ? verticalScale(10) : 0,
                        },
                    ]}
                    >
                    <ScrollView>
                        <Text style={styles.faqAnswerText}>{faq.answer}</Text>
                    </ScrollView>
                    </Animated.View>
                </View>
                );
            })}
            </ScrollView>
        </ImageBackground>
        </SafeAreaView>
    );
    };

    const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#0E3549',
    },
    background: {
        flex: 1,
        paddingHorizontal: moderateScale(20),
        paddingTop: verticalScale(30),
    },
    header: {
        alignItems: 'center',
        marginBottom: verticalScale(20),
    },
    icon: {
        width: moderateScale(50),
        height: moderateScale(50),
        resizeMode: 'contain',
    },
    title: {
        marginTop: verticalScale(10),
        fontSize: moderateScale(22),
        fontFamily: 'Roboto_700Bold',
        color: '#fff',
    },
    faqContainer: {
        gap: verticalScale(15),
        paddingBottom: verticalScale(50),
    },
    faqItem: {
        backgroundColor: '#D9D9D9', 
        borderRadius: moderateScale(20),
        overflow: 'hidden',
        shadowColor: '#000',
        shadowOpacity: 0.2,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 6,
        elevation: 4,
    },
    faqQuestion: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#FFFFFF', 
        paddingVertical: verticalScale(12),
        paddingHorizontal: moderateScale(15),
        borderTopLeftRadius: moderateScale(20),
        borderTopRightRadius: moderateScale(20),
    },
    faqQuestionText: {
        color: '#0E3549', //azul para texto
        fontFamily: 'Roboto_700Bold',
        fontSize: moderateScale(14),
        flex: 1,
    },
    faqAnswer: {
        backgroundColor: '#F0F0F0 ',
        paddingVertical: verticalScale(10),
        paddingHorizontal: moderateScale(15),
    },
    faqAnswerText: {
        color: '#0E3549',
        fontFamily: 'Roboto_400Regular',
        fontSize: moderateScale(15),
        lineHeight: verticalScale(18),
        textAlign: 'justify',
    },
    });

    export default FrequentlyQuestions;
