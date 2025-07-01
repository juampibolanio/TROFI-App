import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  SafeAreaView,
  ImageBackground,
  Pressable,
  Modal,
  Dimensions,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import { deletePhoto, uploadPhoto } from '@/services/userService';
import { addUserPhoto, removeUserPhoto } from '@/redux/slices/userSlice';
import { uploadProfileImage } from '@/services/imageService';
import { useEffect, useState } from 'react';
import { router } from 'expo-router';
import imagePath from '@/constants/imagePath';
import { moderateScale, scale, verticalScale } from 'react-native-size-matters';
import fonts from '@/constants/fonts';
import { useFonts } from '@expo-google-fonts/roboto';
import CustomAlert from '@/components/atoms/CustomAlert';
import Loader from '@/components/atoms/Loader';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

const MyGallery = () => {
  const dispatch = useDispatch();
  const jobImages = useSelector((state: RootState) => state.user.jobImages) || [];
  const user = useSelector((state: RootState) => state.user);
  const [fontsLoaded] = useFonts(fonts);

  const [selectionMode, setSelectionMode] = useState(false);
  const [selectedPhotos, setSelectedPhotos] = useState<number[]>([]);

  // Estados para la vista previa
  const [previewVisible, setPreviewVisible] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const [isGalleryReady, setIsGalleryReady] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsGalleryReady(true);
    }, 500); // Espera de 0.5 segundos

    return () => clearTimeout(timer);
  }, []);
  // Estados para CustomAlert
  const [alertVisible, setAlertVisible] = useState(false);
  const [alertConfig, setAlertConfig] = useState({
    type: 'info' as 'success' | 'error' | 'warning' | 'info',
    title: '',
    message: '',
    showCancel: false,
    confirmText: 'Aceptar',
    cancelText: 'Cancelar',
    onConfirm: () => { },
    onCancel: () => { }
  });

  // Función helper para mostrar alerts
  const showAlert = (config: typeof alertConfig) => {
    setAlertConfig(config);
    setAlertVisible(true);
  };

  // Agregar imagen a galería
  const handleAddPhoto = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 0.7,
    });

    if (!result.canceled && result.assets?.length > 0) {
      try {
        const localUri = result.assets[0].uri;
        const uploadedUrl = await uploadProfileImage(localUri);
        const imageData = await uploadPhoto(uploadedUrl);
        dispatch(addUserPhoto(imageData));

        showAlert({
          type: 'success',
          title: '¡Éxito!',
          message: 'La imagen se subió correctamente a tu galería.',
          showCancel: false,
          confirmText: 'Continuar',
          onConfirm: () => setAlertVisible(false),
          onCancel: () => { },
          cancelText: ''
        });
      } catch (e) {
        console.error('Error al subir la imagen:', e);
        showAlert({
          type: 'error',
          title: 'Error',
          message: 'No se pudo subir la imagen. Verifica tu conexión e intenta nuevamente.',
          showCancel: false,
          confirmText: 'Reintentar',
          onConfirm: () => setAlertVisible(false),
          onCancel: () => { },
          cancelText: ''
        });
      }
    }
  };

  // Mostrar imagen en vista previa
  const handleImagePress = (imageUrl: string, photoId: number) => {
    if (selectionMode) {
      toggleSelection(photoId);
    } else {
      setSelectedImage(imageUrl);
      setPreviewVisible(true);
    }
  };

  // Cerrar vista previa
  const closePreview = () => {
    setPreviewVisible(false);
    setSelectedImage(null);
  };

  // eliminar imagen al mantener presionado
  const handleDeletePhoto = (photoId: number) => {
    showAlert({
      type: 'warning',
      title: 'Eliminar Foto',
      message: '¿Estás seguro que deseas eliminar esta imagen? Esta acción no se puede deshacer.',
      showCancel: true,
      confirmText: 'Eliminar',
      cancelText: 'Cancelar',
      onConfirm: async () => {
        setAlertVisible(false);
        try {
          await deletePhoto(photoId);
          dispatch(removeUserPhoto(photoId));
          showAlert({
            type: 'success',
            title: '¡Eliminada!',
            message: 'La imagen se eliminó correctamente de tu galería.',
            showCancel: false,
            confirmText: 'Continuar',
            onConfirm: () => setAlertVisible(false),
            onCancel: () => { },
            cancelText: ''
          });
        } catch (err) {
          console.error(err);
          showAlert({
            type: 'error',
            title: 'Error',
            message: 'No se pudo eliminar la imagen. Intenta nuevamente.',
            showCancel: false,
            confirmText: 'Aceptar',
            onConfirm: () => setAlertVisible(false),
            onCancel: () => { },
            cancelText: ''
          });
        }
      },
      onCancel: () => setAlertVisible(false)
    });
  };

  // Eliminar multiples imagenes: seleccionar imagen
  const toggleSelection = (photoId: number) => {
    if (selectedPhotos.includes(photoId)) {
      setSelectedPhotos(selectedPhotos.filter(id => id !== photoId));
    } else {
      setSelectedPhotos([...selectedPhotos, photoId]);
    }
  };

  // Activar modo selección con mensaje informativo
  const enableSelectionMode = () => {
    setSelectionMode(true);
    showAlert({
      type: 'info',
      title: 'Modo Selección',
      message: 'Ahora puedes tocar las imágenes que deseas eliminar. Aparecerá una marca de verificación en las seleccionadas.',
      showCancel: false,
      confirmText: 'Entendido',
      onConfirm: () => setAlertVisible(false),
      onCancel: () => { },
      cancelText: ''
    });
  };

  // Confirmar eliminación múltiple
  const confirmMultipleDelete = () => {
    if (selectedPhotos.length === 0) {
      showAlert({
        type: 'info',
        title: 'Sin imágenes seleccionadas',
        message: 'Por favor, toca las imágenes que deseas eliminar para seleccionarlas.',
        showCancel: false,
        confirmText: 'Continuar',
        onConfirm: () => setAlertVisible(false),
        onCancel: () => { },
        cancelText: ''
      });
      return;
    }

    const imageText = selectedPhotos.length === 1 ? 'imagen' : 'imágenes';
    showAlert({
      type: 'warning',
      title: 'Confirmar Eliminación',
      message: `¿Estás seguro que deseas eliminar ${selectedPhotos.length} ${imageText} seleccionada${selectedPhotos.length > 1 ? 's' : ''}? Esta acción no se puede deshacer.`,
      showCancel: true,
      confirmText: 'Eliminar',
      cancelText: 'Cancelar',
      onConfirm: async () => {
        setAlertVisible(false);
        try {
          for (const id of selectedPhotos) {
            await deletePhoto(id);
            dispatch(removeUserPhoto(id));
          }
          const deletedCount = selectedPhotos.length;
          setSelectedPhotos([]);
          setSelectionMode(false);

          showAlert({
            type: 'success',
            title: '¡Eliminadas!',
            message: `${deletedCount} ${imageText} eliminada${deletedCount > 1 ? 's' : ''} correctamente de tu galería.`,
            showCancel: false,
            confirmText: 'Continuar',
            onConfirm: () => setAlertVisible(false),
            onCancel: () => { },
            cancelText: ''
          });
        } catch (e) {
          console.error(e);
          showAlert({
            type: 'error',
            title: 'Error',
            message: 'No se pudieron eliminar todas las imágenes. Verifica tu conexión e intenta nuevamente.',
            showCancel: false,
            confirmText: 'Aceptar',
            onConfirm: () => setAlertVisible(false),
            onCancel: () => { },
            cancelText: ''
          });
        }
      },
      onCancel: () => setAlertVisible(false)
    });
  };

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
          <Text style={styles.title}>Mi Galería</Text>
        </View>

        <ScrollView contentContainerStyle={styles.scrollContent}>
          {/* BANNER INFORMATIVO EN MODO SELECCIÓN */}
          {selectionMode && (
            <View style={styles.selectionBanner}>
              <Ionicons name="checkmark-circle-outline" size={20} color="#FFFFFF" />
              <Text style={styles.selectionBannerText}>
                {selectedPhotos.length > 0
                  ? `${selectedPhotos.length} imagen${selectedPhotos.length > 1 ? 'es' : ''} seleccionada${selectedPhotos.length > 1 ? 's' : ''}`
                  : 'Toca las imágenes que deseas eliminar'
                }
              </Text>
            </View>
          )}

          <View style={styles.imageContainer}>
            {!isGalleryReady ? (
              <Loader />
            ) : Array.isArray(jobImages) && jobImages.length > 0 ? (
              jobImages.map((photo) => {
                if (!photo?.url || typeof photo.url !== 'string') return null;

                return (
                  <TouchableOpacity
                    key={photo.id}
                    onLongPress={() => !selectionMode && handleDeletePhoto(photo.id)}
                    onPress={() => handleImagePress(photo.url, photo.id)}
                    style={[
                      styles.imageWrapper,
                      selectionMode && selectedPhotos.includes(photo.id) && styles.imageSelected
                    ]}
                  >
                    <Image
                      source={{ uri: photo.url }}
                      style={styles.image}
                      defaultSource={imagePath.defaultUserImage}
                    />
                    {selectionMode && selectedPhotos.includes(photo.id) && (
                      <Ionicons name="checkmark-circle" size={24} color="#D9D9D9" style={styles.checkIcon} />
                    )}
                  </TouchableOpacity>
                );
              })
            ) : (
              <Text style={styles.textNoImage}>
                Aún no has subido fotos.
              </Text>
            )}
          </View>


          {/* FOOTER - Botones de acción */}
          <View style={styles.footer}>
            <View style={styles.profileBottomsContainer}>
              <Pressable
                style={({ pressed }) => [styles.workGalery, pressed && { opacity: 0.5 }]}
                onPress={handleAddPhoto}
              >
                <Text style={styles.textBottom}>Agregar foto</Text>
              </Pressable>

              {selectionMode ? (
                <>
                  <Pressable
                    style={({ pressed }) => [styles.workGalery, styles.deleteButton, pressed && { opacity: 0.5 }]}
                    onPress={confirmMultipleDelete}
                  >
                    <Text style={styles.textBottom}>Eliminar seleccionadas</Text>
                  </Pressable>

                  <Pressable
                    style={({ pressed }) => [styles.workGalery, styles.cancelButton, pressed && { opacity: 0.5 }]}
                    onPress={() => {
                      setSelectionMode(false);
                      setSelectedPhotos([]);
                    }}
                  >
                    <Text style={styles.textBottom}>Cancelar</Text>
                  </Pressable>
                </>
              ) : (
                <Pressable
                  style={({ pressed }) => [styles.workGalery, pressed && { opacity: 0.5 }]}
                  onPress={enableSelectionMode}
                >
                  <Text style={styles.textBottom}>Eliminar fotos</Text>
                </Pressable>
              )}
            </View>
          </View>
        </ScrollView>

        {/* MODAL DE VISTA PREVIA */}
        <Modal
          visible={previewVisible}
          transparent={true}
          animationType="fade"
          onRequestClose={closePreview}
        >
          <View style={styles.modalContainer}>
            <TouchableOpacity
              style={styles.modalBackground}
              activeOpacity={1}
              onPress={closePreview}
            >
              <View style={styles.modalContent}>
                <TouchableOpacity
                  style={styles.closeButton}
                  onPress={closePreview}
                >
                  <Ionicons name="close" size={30} color="#FFFFFF" />
                </TouchableOpacity>

                {selectedImage && (
                  <Image
                    source={{ uri: selectedImage }}
                    style={styles.previewImage}
                    resizeMode="contain"
                  />
                )}
              </View>
            </TouchableOpacity>
          </View>
        </Modal>

        {/* Configuro el custom alert */}
        <CustomAlert
          visible={alertVisible}
          type={alertConfig.type}
          title={alertConfig.title}
          message={alertConfig.message}
          showCancel={alertConfig.showCancel}
          confirmText={alertConfig.confirmText}
          cancelText={alertConfig.cancelText}
          onConfirm={alertConfig.onConfirm}
          onCancel={alertConfig.onCancel}
        />

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

  scrollContent: {
    paddingTop: moderateScale(70),
    paddingBottom: moderateScale(20),
  },

  imageContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginBottom: moderateScale(20),
  },

  imageWrapper: {
    position: 'relative',
  },

  image: {
    width: scale(150),
    height: scale(150),
    margin: moderateScale(13),
    borderRadius: moderateScale(25),
    borderColor: '#FFFFFF',
    borderWidth: 2
  },

  imageSelected: {
    opacity: 0.7,
  },

  checkIcon: {
    position: 'absolute',
    top: moderateScale(20),
    right: moderateScale(20),
    backgroundColor: '#000000',
    borderRadius: moderateScale(12),
  },

  textNoImage: {
    color: '#FFFFFF',
    fontSize: moderateScale(16),
    textAlign: 'center',
    marginTop: verticalScale(20),
    fontFamily: 'RobotoLight',
  },

  /* ----------------------------------- FOOTER -----------------------------------*/

  footer: {
    justifyContent: 'center',
  },

  profileBottomsContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    gap: moderateScale(10),
    padding: moderateScale(15)
  },

  workGalery: {
    padding: moderateScale(12),
    backgroundColor: '#1F4F66',
    borderRadius: moderateScale(12),
    minWidth: moderateScale(200),
    alignItems: 'center',
  },

  deleteButton: {
    backgroundColor: '#E06C75',
    paddingVertical: moderateScale(10),
    paddingHorizontal: moderateScale(20),
    borderRadius: moderateScale(8),
    shadowColor: '#B04A48',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 3,
  },

  cancelButton: {
    backgroundColor: '#4A5A6A',
    paddingVertical: moderateScale(10),
    paddingHorizontal: moderateScale(20),
    borderRadius: moderateScale(8),
    shadowColor: '#2F3A45',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 3,
  },

  textBottom: {
    color: '#F0F0F0',
    fontSize: moderateScale(14),
    fontFamily: 'RobotoRegular',
    fontWeight: 'bold',
    textAlign: 'center',
  },

  /* ----------------------------------- MODAL VISTA PREVIA -----------------------------------*/

  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.9)',
    justifyContent: 'center',
    alignItems: 'center',
  },

  modalBackground: {
    flex: 1,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },

  modalContent: {
    flex: 1,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },

  closeButton: {
    position: 'absolute',
    top: moderateScale(50),
    right: moderateScale(20),
    zIndex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    borderRadius: moderateScale(20),
    padding: moderateScale(5),
  },

  previewImage: {
    width: screenWidth,
    height: screenHeight * 0.8,
    borderRadius: moderateScale(10),
  },

  /* ----------------------------------- BANNER DE SELECCIÓN -----------------------------------*/

  selectionBanner: {
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    paddingVertical: moderateScale(12),
    paddingHorizontal: moderateScale(20),
    marginHorizontal: moderateScale(20),
    marginBottom: moderateScale(15),
    borderRadius: moderateScale(10),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: moderateScale(8),
  },

  selectionBannerText: {
    color: '#FFFFFF',
    fontSize: moderateScale(14),
    fontFamily: 'RobotoRegular',
    textAlign: 'center',
  },
});

export default MyGallery;