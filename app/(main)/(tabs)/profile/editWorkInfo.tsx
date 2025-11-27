import fonts from '@/constants/fonts';
import imagePath from '@/constants/imagePath';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import React, { useEffect, useState } from 'react';
import {
    View,
    Text,
    ImageBackground,
    SafeAreaView,
    StyleSheet,
    Image,
    ActivityIndicator,
    TouchableOpacity,
} from 'react-native';
import { moderateScale } from 'react-native-size-matters';
import ButtonComponent from '@/components/atoms/ButtonComponent';
import CustomAlert from '@/components/atoms/CustomAlert';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import { fetchJobCategories } from '@/services/jobService';

const editWorkInfo = () => {
    const { id_job, job_description } = useSelector((state: RootState) => state.user);
    const [jobName, setJobName] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [showErrorAlert, setShowErrorAlert] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
        const loadJobName = async () => {
            try {
                const jobs = await fetchJobCategories();
                const currentJob = jobs.find((job: any) => job.id === id_job);
                setJobName(currentJob?.name || null);
            } catch (error) {
                console.error('Error al obtener los oficios', error);
                setErrorMessage('No se pudo cargar la información laboral. Por favor, inténtalo nuevamente.');
                setShowErrorAlert(true);
            } finally {
                setIsLoading(false);
            }
        };

        if (id_job) {
            loadJobName();
        } else {
            setIsLoading(false);
        }
    }, [id_job]);

    const handleRetry = () => {
        setShowErrorAlert(false);
        setIsLoading(true);
        
        // Recargar datos
        const loadJobName = async () => {
            try {
                const jobs = await fetchJobCategories();
                const currentJob = jobs.find((job: any) => job.id === id_job);
                setJobName(currentJob?.name || null);
            } catch (error) {
                console.error('Error al obtener los oficios', error);
                setErrorMessage('No se pudo cargar la información laboral. Por favor, inténtalo nuevamente.');
                setShowErrorAlert(true);
            } finally {
                setIsLoading(false);
            }
        };

        if (id_job) loadJobName();
        else setIsLoading(false);
    };

    return (
        <SafeAreaView style={styles.container}>
            <ImageBackground
                style={styles.overlay}
                source={imagePath.editWorkInfoBackground}
                resizeMode="cover"
            >
                {/* Header con botón de regreso */}
                <View style={styles.headerContainer}>
                    <TouchableOpacity 
                        style={styles.backButton}
                        onPress={() => router.back()}
                    >
                        <Ionicons name="arrow-back" size={moderateScale(24)} color="white" />
                    </TouchableOpacity>
                    
                    <View style={styles.header}>
                        <Image source={imagePath.icon} style={styles.iconStyle} resizeMode="contain" />
                    </View>
                </View>

                {/* Contenido principal */}
                <View style={styles.contentContainer}>
                    {isLoading ? (
                        <View style={styles.loadingContainer}>
                            <ActivityIndicator size="large" color="#ffffff" />
                            <Text style={styles.loadingText}>Cargando información...</Text>
                        </View>
                    ) : (
                        <View style={styles.infoContainer}>
                            <View style={styles.titleContainer}>
                                <Ionicons name="briefcase-outline" size={moderateScale(40)} color="white" />
                                <Text style={styles.title}>Información laboral actual</Text>
                            </View>

                            <View style={styles.infoCard}>
                                <View style={styles.infoRow}>
                                    <View style={styles.labelContainer}>
                                        <Ionicons name="hammer-outline" size={moderateScale(20)} color="#4CAF50" />
                                        <Text style={styles.label}>Oficio:</Text>
                                    </View>
                                    <Text style={styles.text}>
                                        {jobName || 'Sin oficio definido'}
                                    </Text>
                                </View>

                                <View style={styles.separator} />

                                <View style={styles.infoRow}>
                                    <View style={styles.labelContainer}>
                                        <Ionicons name="document-text-outline" size={moderateScale(20)} color="#2196F3" />
                                        <Text style={styles.label}>Descripción:</Text>
                                    </View>
                                    <Text style={styles.text}>
                                        {job_description || 'Sin descripción aún'}
                                    </Text>
                                </View>
                            </View>
                        </View>
                    )}
                </View>

                {/* Botones de acción */}
                <View style={styles.buttonsContainer}>
                    <View style={styles.containerButton}>
                        <ButtonComponent
                            title="Editar información laboral"
                            iconName="pencil"
                            onPress={() => router.push('/(main)/(tabs)/profile/editEmploymentInfo')}
                            disabled={isLoading}
                        />
                    </View>

                    <View style={styles.footerButton}>
                        <ButtonComponent
                            title="Cancelar"
                            iconName="exit-outline"
                            onPress={() => router.back()}
                        />
                    </View>
                </View>
            </ImageBackground>

            {/* Alert de error */}
            <CustomAlert
                visible={showErrorAlert}
                title="Error de conexión"
                message={errorMessage}
                type="error"
                showCancel={true}
                confirmText="Reintentar"
                cancelText="Cancelar"
                onConfirm={handleRetry}
                onCancel={() => {
                    setShowErrorAlert(false);
                    router.back();
                }}
            />
        </SafeAreaView>
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
    headerContainer: {
        position: 'relative',
        alignItems: 'center',
        marginTop: moderateScale(20),
    },
    backButton: {
        position: 'absolute',
        left: moderateScale(20),
        top: moderateScale(5),
        zIndex: 1,
        padding: moderateScale(8),
        borderRadius: moderateScale(20),
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
    },
    header: {
        alignItems: 'center',
    },
    iconStyle: {
        width: moderateScale(50),
        height: moderateScale(50),
    },
    contentContainer: {
        flex: 1,
        justifyContent: 'center',
    },
    loadingContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: moderateScale(40),
    },
    loadingText: {
        color: '#fff',
        fontSize: moderateScale(16),
        marginTop: moderateScale(10),
    },
    infoContainer: {
        paddingHorizontal: moderateScale(20),
        paddingVertical: moderateScale(20),
    },
    titleContainer: {
        alignItems: 'center',
        marginBottom: moderateScale(30),
    },
    title: {
        fontSize: moderateScale(22),
        fontWeight: 'bold',
        color: '#fff',
        marginTop: moderateScale(15),
        textAlign: 'center',
    },
    infoCard: {
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
        borderRadius: moderateScale(15),
        padding: moderateScale(20),
        borderWidth: 1,
        borderColor: 'rgba(255, 255, 255, 0.2)',
    },
    infoRow: {
        marginBottom: moderateScale(15),
    },
    labelContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: moderateScale(8),
    },
    label: {
        fontSize: moderateScale(16),
        fontWeight: '600',
        color: '#fff',
        marginLeft: moderateScale(8),
    },
    text: {
        fontSize: moderateScale(16),
        color: '#E0E0E0',
        lineHeight: moderateScale(22),
        paddingLeft: moderateScale(28),
    },
    separator: {
        height: 1,
        backgroundColor: 'rgba(255, 255, 255, 0.2)',
        marginVertical: moderateScale(15),
    },
    buttonsContainer: {
        paddingBottom: moderateScale(20),
    },
    containerButton: {
        paddingHorizontal: moderateScale(20),
        marginBottom: moderateScale(15),
    },
    footerButton: {
        paddingHorizontal: moderateScale(20),
    },
});

export default editWorkInfo;