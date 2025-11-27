import {
  View, Text, ImageBackground, StyleSheet, Image, TextInput,
  Pressable, KeyboardAvoidingView, Platform, ScrollView,
  TouchableWithoutFeedback,
  Keyboard
} from 'react-native';
import { useState, useRef } from 'react';
import { router, useLocalSearchParams } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import imagePath from '@/constants/imagePath';
import { moderateScale, verticalScale } from 'react-native-size-matters';
import StarRating from 'react-native-star-rating-widget';
import { createReview } from '@/services/reviewService';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import CustomAlert from '@/components/atoms/CustomAlert';

const ReviewForm = () => {
  const { uid, name, imageProfile } = useLocalSearchParams();
  const scrollViewRef = useRef<ScrollView>(null);

  const currentUserUid = useSelector((state: RootState) => state.user.uid);
  const [rating, setRating] = useState(0);
  const [reseña, setReseña] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Estados para los alerts
  const [alertConfig, setAlertConfig] = useState({
    visible: false,
    type: 'info' as 'success' | 'error' | 'warning' | 'info',
    title: '',
    message: '',
    showCancel: false,
    onConfirm: () => { },
    onCancel: () => { }
  });

  const showAlert = (
    type: 'success' | 'error' | 'warning' | 'info',
    title: string,
    message: string,
    showCancel: boolean = false,
    onConfirm: () => void = () => { },
    onCancel: () => void = () => { }
  ) => {
    setAlertConfig({
      visible: true,
      type,
      title,
      message,
      showCancel,
      onConfirm,
      onCancel
    });
  };

  const hideAlert = () => {
    setAlertConfig(prev => ({ ...prev, visible: false }));
  };

  // Función para manejar el cambio de rating con validación
  const handleRatingChange = (newRating: number) => {
    // Si es menor a 1, establecer en 1
    if (newRating < 1) {
      setRating(1);
    } else {
      // Permitir medias estrellas desde 1 en adelante
      // Redondear a la media estrella más cercana
      const roundedRating = Math.round(newRating * 2) / 2;
      setRating(roundedRating);
    }
  };

  const handleTextInputFocus = () => {
    // Hacer scroll hacia abajo cuando se enfoque el TextInput
    setTimeout(() => {
      scrollViewRef.current?.scrollToEnd({ animated: true });
    }, 100);
  };

  const handleSubmitReview = async () => {
    if (isSubmitting) return;

    // Validaciones
    if (!reseña || reseña.trim().length < 10) {
      showAlert(
        'warning',
        'Descripción incompleta',
        'La reseña debe tener al menos 10 caracteres.',
        false,
        hideAlert
      );
      return;
    }

    if (rating === 0) {
      showAlert(
        'warning',
        'Puntuación requerida',
        'Debes seleccionar una puntuación mínima de 1 estrella.',
        false,
        hideAlert
      );
      return;
    }

    if (!currentUserUid) {
      showAlert(
        'error',
        'Error de autenticación',
        'No se encontró el usuario. Intenta iniciar sesión nuevamente.',
        false,
        hideAlert
      );
      return;
    }

    if (currentUserUid === uid) {
      showAlert(
        'error',
        'Error',
        'No puedes reseñarte a ti mismo.',
        false,
        hideAlert
      );
      return;
    }

    try {
      setIsSubmitting(true);
      await createReview(uid as string, reseña.trim(), rating);

      showAlert(
        'success',
        '¡Éxito!',
        'Reseña enviada con éxito',
        false,
        () => {
          hideAlert();
          router.back();
        }
      );
    } catch (e: any) {
      console.error('Error al enviar la reseña:', e);

      let errorMessage = 'Ocurrió un error al enviar la reseña. Intenta nuevamente.';

      // Manejar errores específicos del backend
      if (e.response?.data?.message) {
        errorMessage = e.response.data.message;
      }

      showAlert(
        'error',
        'Error',
        errorMessage,
        false,
        hideAlert
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 100 : 20}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <ImageBackground
            style={styles.overlay}
            source={imagePath.backgroundSRDetails}
            resizeMode='cover'
          >
            <ScrollView
              ref={scrollViewRef}
              contentContainerStyle={styles.scrollContent}
              keyboardShouldPersistTaps="handled"
              showsVerticalScrollIndicator={false}
              bounces={false}
            >
              <View style={styles.header}>
                <Image source={imagePath.icon} style={styles.logo} />
                <Image
                  source={
                    typeof imageProfile === 'string' && imageProfile
                      ? { uri: imageProfile }
                      : imagePath.defaultUserImage
                  }
                  style={styles.userImage}
                  resizeMode='cover'
                />
              </View>

              <View style={styles.body}>
                <View style={styles.bodyElements}>
                  <View style={styles.starAndTitleContainer}>
                    <Text style={styles.reviewTitle}>
                      ¿Cómo fueron los servicios de {name}?
                    </Text>
                    <StarRating
                      rating={rating}
                      onChange={handleRatingChange}
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
                      placeholder='Escribe una reseña (mínimo 10 caracteres)...'
                      placeholderTextColor="#999"
                      value={reseña}
                      onChangeText={setReseña}
                      onFocus={handleTextInputFocus}
                      textAlignVertical="top"
                      blurOnSubmit={false}
                      maxLength={500}
                      editable={!isSubmitting}
                    />

                    <Text style={styles.charCount}>
                      {reseña.length}/500 caracteres
                    </Text>

                    <View style={styles.buttonsContainer}>
                      <Pressable
                        style={({ pressed }) => [
                          styles.cancelButton,
                          (pressed || isSubmitting) && { opacity: 0.5 }
                        ]}
                        onPress={() => { router.back() }}
                        disabled={isSubmitting}
                      >
                        <Text style={styles.cancelButtonText}>Cancelar</Text>
                      </Pressable>

                      <Pressable
                        style={({ pressed }) => [
                          styles.sendReviewButton,
                          (pressed || isSubmitting) && { opacity: 0.5 }
                        ]}
                        onPress={handleSubmitReview}
                        disabled={isSubmitting}
                      >
                        <Text style={styles.sendReviewButtonText}>
                          {isSubmitting ? 'Enviando...' : 'Enviar Reseña'}
                        </Text>
                      </Pressable>
                    </View>
                  </View>
                </View>
              </View>

            </ScrollView>
          </ImageBackground>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>

      {/* Custom Alert */}
      <CustomAlert
        visible={alertConfig.visible}
        type={alertConfig.type}
        title={alertConfig.title}
        message={alertConfig.message}
        showCancel={alertConfig.showCancel}
        onConfirm={alertConfig.onConfirm}
        onCancel={alertConfig.onCancel}
      />
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
  scrollContent: {
    flexGrow: 1,
    paddingBottom: verticalScale(50),
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
    minHeight: verticalScale(400),
  },
  bodyElements: {
    alignItems: 'center',
    gap: moderateScale(10),
    flex: 1,
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
    flex: 1,
    justifyContent: 'center',
  },
  textArea: {
    width: '85%',
    height: verticalScale(120),
    borderWidth: 3,
    borderColor: '#0E3549',
    borderRadius: moderateScale(35),
    paddingHorizontal: moderateScale(20),
    paddingVertical: moderateScale(15),
    fontSize: moderateScale(14),
    color: '#0E3549',
    backgroundColor: '#FFFFFF',
    textAlignVertical: 'top',
    textAlign: 'justify',
  },
  charCount: {
    fontSize: moderateScale(11),
    color: '#666',
    marginTop: moderateScale(5),
    alignSelf: 'center',
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '70%',
    marginTop: moderateScale(25),
    gap: moderateScale(12),
  },
  cancelButton: {
    backgroundColor: '#DD4B4B',
    borderRadius: moderateScale(20),
    paddingVertical: moderateScale(12),
    paddingHorizontal: moderateScale(20),
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
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
    paddingVertical: moderateScale(12),
    paddingHorizontal: moderateScale(20),
    flex: 1,
  },
  sendReviewButtonText: {
    color: '#FFFFFF',
    fontSize: moderateScale(14),
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default ReviewForm;