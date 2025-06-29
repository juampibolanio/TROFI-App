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

const editProfile = () => {
    const [showPersonalModal, setShowPersonalModal] = useState(false);
    const [shownLaboralModal, setLaboralModal] = useState(false);
    const [shownSessionModal, setShownSessionModal] = useState(false);

const navigateToEditImageProfile = () => {
    router.push("/profile/editImageProfile");
};


    return (
<SafeAreaView style={styles.container}>
    <ImageBackground 
        style={styles.overlay} 
        source={imagePath.editProfileBackground} 
        resizeMode="cover">
        
        {/* HEADER */}
        <View style={styles.header}>
            <Image 
                source={imagePath.icon} 
                style={styles.iconStyle} 
                resizeMode="contain" 
            />

            <View style={styles.avatarWrapper}>
                <Image 
                    source={imagePath.editProfileImage} 
                    style={styles.userImage} 
                    resizeMode="cover" 
                />
                    <Pressable 
                        style={styles.editButton} 
                        onPress={navigateToEditImageProfile}>
                            <Ionicons 
                                name="pencil" 
                                size={16} 
                                color="#0E3549" 
                            />
                    </Pressable>
            </View>

            <Text style={styles.editionText}>
                Hola! -NOMBRE USUARIO- te encuentras en edición de perfil
            </Text>
        </View>

        {/* BODY */}
        <View style={styles.containerButton}>
            <ButtonComponent 
                title="Editar información personal"
                iconName="pencil"
                onPress={() => setShowPersonalModal(true)}
            />

            <ButtonComponent 
                title="Editar información laboral"
                iconName="pencil"
                onPress={() => setLaboralModal(true)}
            />
        </View>

        {/* FOOTER */}
        <View style={styles.containerButton}>
            <ButtonComponent 
                title="Cerrar sesión"
                iconName="exit-outline"
                onPress={() => setShownSessionModal(true)}
            />
        </View>

    </ImageBackground>

      {/* MODAL */}

    <Modal
        visible={showPersonalModal}
        animationType="fade"
        transparent
        onRequestClose={() => setShowPersonalModal(false)}
    >
        <View style={styles.modalOverlay}>
            <View style={styles.modalContainer}>

                <Text style={styles.modalTitle}>
                    Editar información personal
                </Text>

                <Text style={styles.modalDescription}>
                    Para editar su información personal deberá proporcionar más datos adicionales.
                </Text>

                <View style={styles.modalButtons}>
                    <Pressable onPress={() => setShowPersonalModal(false)}>
                        <Text style={styles.cancelText}>Cancelar</Text>
                    </Pressable>

                    <Pressable onPress={() => {
                            setShowPersonalModal(false);
                            // aca deberia ir la ruta para editar esa información
                            }}>
                        <Text style={styles.confirmText}>
                            Confirmar
                        </Text>
                    </Pressable>
                </View>
            </View>
        </View>
    </Modal>

    <Modal
        visible={shownLaboralModal}
        animationType="fade"
        transparent
        onRequestClose={() => setShowPersonalModal(false)}
    >
        <View style={styles.modalOverlay}>
            <View style={styles.modalContainer}>

                <Text style={styles.modalTitle}>
                    Editar información laboral
                </Text>

                <Text style={styles.modalDescription}>
                    Para editar su información laboral deberá proporcionar más datos adicionales.
                </Text>

                <View style={styles.modalButtons}>
                    <Pressable onPress={() => setLaboralModal(false)}>
                        <Text style={styles.cancelText}>Cancelar</Text>
                    </Pressable>

                    <Pressable onPress={() => {
                            setLaboralModal(false);
                            router.push('/profile/editWorkInfo');
                            }}>
                        <Text style={styles.confirmText}>
                            Confirmar
                        </Text>
                    </Pressable>
                </View>
            </View>
        </View>
    </Modal>

    <Modal
        visible={shownSessionModal}
        animationType="fade"
        transparent
        onRequestClose={() => setShownSessionModal(false)}
    >
        <View style={styles.modalOverlay}>
            <View style={styles.modalContainer}>

                <Text style={styles.modalTitle}>
                    Cerrar sesión
                </Text>

                <Text style={styles.modalDescription}>
                    ¿Esta seguro que desea cerrar sersión?
                </Text>

                <View style={styles.modalButtons}>
                    <Pressable onPress={() => setShownSessionModal(false)}>
                        <Text style={styles.cancelText}>Cancelar</Text>
                    </Pressable>

                    <Pressable onPress={() => {
                            setShownSessionModal(false);
                            // aca deberia ir la ruta al cerrar sesion
                            }}>
                        <Text style={styles.confirmText}>
                            Confirmar
                        </Text>
                    </Pressable>
                </View>
            </View>
        </View>
    </Modal>
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
editionText: {
    textAlign: "center",
    fontSize: moderateScale(25),
    fontFamily: 'Roboto_300Light',
    color: '#FFFFFF',
    marginRight: moderateScale(5),
},
containerButton: {
    padding: moderateScale(50),
    gap: moderateScale(20),
},
userImage: {
    width: '100%',
    height: '100%',
    borderRadius: moderateScale(60),
    borderWidth: 4,
    borderColor: '#FFFFFF',
},
editButton: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: '#D9D9D9',
    width: moderateScale(38),
    height: moderateScale(38),
    borderRadius: moderateScale(18),
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: '#0E3549',
},
avatarWrapper: {
    position: 'relative',
    width: moderateScale(120),
    height: moderateScale(120),
    justifyContent: 'center',
    alignItems: 'center',
},
modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    justifyContent: 'center',
    alignItems: 'center',
},
modalContainer: {
    backgroundColor: '#fff',
    borderRadius: moderateScale(20),
    padding: moderateScale(20),
    width: "80%",
    alignItems: 'center',
},
modalTitle: {
    fontSize: moderateScale(20),
    fontWeight: 'bold',
    marginBottom: moderateScale(10),
    textAlign: 'center',
},
modalDescription: {
    fontSize: moderateScale(14),
    textAlign: 'center',
    marginBottom: moderateScale(20),
    color: '#4A4A4A',
},
modalButtons: {
    flexDirection: 'row',
    gap: moderateScale(30),
},
cancelText: {
    fontSize: moderateScale(16),
    color: '#666',
},
confirmText: {
    fontSize: moderateScale(16),
    color: '#007AFF',
    fontWeight: 'bold',
},
});

export default editProfile;
