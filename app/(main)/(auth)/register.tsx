import { useState } from 'react';
import { useFonts } from '@expo-google-fonts/roboto';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ImageBackground,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Keyboard,
  TouchableWithoutFeedback,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import imagePath from '@/constants/imagePath';
import { moderateScale } from 'react-native-size-matters';
import BottomComponent from '@/components/atoms/BottomComponent';
import { router } from 'expo-router';
import { CustomTextInput } from '@/components/atoms/CustomTextInput';
import fonts from '@/constants/fonts';
import { useDispatch } from 'react-redux';
import { registerRequest } from '@/services/authService';
import { setCredentials } from '@/redux/slices/authSlice';
import { storeData } from '@/utils/storage';
import { setUserProfile } from '@/redux/slices/userSlice';
import CustomAlert from '@/components/atoms/CustomAlert';

const RegisterScreen = () => {
  const dispatch = useDispatch();
  const [fontsLoaded] = useFonts(fonts);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');

  // Estados para el CustomAlert
  const [alertVisible, setAlertVisible] = useState(false);
  const [alertConfig, setAlertConfig] = useState({
    title: '',
    message: '',
    type: 'error' as 'success' | 'error' | 'warning' | 'info',
    showCancel: false
  });

  const navigateToLogin = () => {
    router.replace("/(auth)");
  };

  const navigateToOnboarding = () => {
    router.replace("/(main)/(onBoarding)");
  };

  // Función para mostrar alert
  const showAlert = (title: string, message: string, type: 'success' | 'error' | 'warning' | 'info' = 'error') => {
    setAlertConfig({
      title,
      message,
      type,
      showCancel: false
    });
    setAlertVisible(true);
  };

  // Función para cerrar alert
  const closeAlert = () => {
    setAlertVisible(false);
  };

  // Validación de email
  const isValidEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  // Validación de teléfono con prefijos 
  const isValidArgentinePhone = (phone: string) => {
    // Eliminar espacios para validar
    const phoneNoSpaces = phone.replace(/\s+/g, '');

    // acá hago una expresión que acepta prefijos entre 2 y 4 dígitos, seguido de 6 a 8 dígitos
    const regex = /^(?:11|2\d{2,3}|3\d{2,3}|[34679]\d{2,3})\d{6,8}$/;
    return regex.test(phoneNoSpaces);
  };

  const handleRegister = async () => {
    try {
      // Validación de campos vacíos
      if (!firstName.trim()) {
        showAlert("Campo requerido", "Por favor, ingresa tu nombre.", 'warning');
        return;
      }

      if (!lastName.trim()) {
        showAlert("Campo requerido", "Por favor, ingresa tu apellido.", 'warning');
        return;
      }

      if (!email.trim()) {
        showAlert("Campo requerido", "Por favor, ingresa tu correo electrónico.", 'warning');
        return;
      }

      if (!password.trim()) {
        showAlert("Campo requerido", "Por favor, ingresa una contraseña.", 'warning');
        return;
      }

      if (!confirmPassword.trim()) {
        showAlert("Campo requerido", "Por favor, confirma tu contraseña.", 'warning');
        return;
      }

      if (!phoneNumber.trim()) {
        showAlert("Campo requerido", "Por favor, ingresa tu número de teléfono.", 'warning');
        return;
      }

      // Validación de email
      if (!isValidEmail(email)) {
        showAlert("Email inválido", "Por favor, ingresa un correo electrónico válido.", 'warning');
        return;
      }

      // Validación de contraseña
      if (password.length < 6) {
        showAlert("Contraseña corta", "La contraseña debe tener al menos 6 caracteres.", 'warning');
        return;
      }

      // Validación de coincidencia de contraseñas
      if (password !== confirmPassword) {
        showAlert("Contraseñas no coinciden", "Las contraseñas ingresadas no son iguales. Por favor, verifícalas.", 'error');
        return;
      }

      // Validación de teléfono
      if (!isValidArgentinePhone(phoneNumber)) {
        showAlert("Número inválido", "Por favor, ingresa un número de teléfono válido (Formato: código de área + número).", 'warning');
        return;
      }

      const fullName = `${firstName.trim()} ${lastName.trim()}`.trim();

      const response = await registerRequest({
        name: fullName,
        email: email,
        password: password,
        phoneNumber: phoneNumber,
      });

      const token = response.token;
      const user = response.user;

      dispatch(setCredentials({ token, email: user.email }));
      await storeData('auth', { token, email: user.email });

      dispatch(setUserProfile({
        id: user.id,
        name: user.name,
        phoneNumber: user.phoneNumber,
      }));
      await storeData('user', {
        id: user.id,
        name: user.name,
        email: user.email,
        phoneNumber: user.phoneNumber,
      });

      // Mostrar mensaje de éxito
      showAlert("¡Registro exitoso!", "Tu cuenta ha sido creada correctamente. Bienvenido a nuestra app.", 'success');

      // delay para que se vea el mensaje de éxito
      setTimeout(() => {
        closeAlert();
        navigateToOnboarding();
      }, 2000);

    } catch (e: any) {
      console.error(e);
      if (e.response?.data) {
        const errors = e.response.data;

        // Si hay errores específicos del servidor
        if (typeof errors === 'object') {
          const errorMessages = Object.values(errors).flat();
          const firstError = errorMessages[0] as string;

          // Personalizar mensajes según el tipo de error
          if (firstError.toLowerCase().includes('email')) {
            showAlert("Email ya registrado", "Este correo electrónico ya está en uso. Por favor, usa otro correo o inicia sesión.", 'error');
          } else if (firstError.toLowerCase().includes('phone')) {
            showAlert("Teléfono ya registrado", "Este número de teléfono ya está registrado. Por favor, usa otro número.", 'error');
          } else {
            showAlert("Error del servidor", firstError, 'error');
          }
        } else {
          showAlert("Error del servidor", errors.toString(), 'error');
        }
      } else {
        showAlert("Error de conexión", "No se pudo registrar el usuario. Por favor, verifica tu conexión a internet e intenta nuevamente.", 'error');
      console.log(e);
      }
    }
  };

  if (!fontsLoaded) return null;

  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground
        style={styles.overlay}
        source={imagePath.backgroundOnBoarding}
        resizeMode='cover'
      >
        <KeyboardAvoidingView
          style={{ flex: 1, width: '100%' }}
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          keyboardVerticalOffset={Platform.OS === 'ios' ? 60 : 0}
        >
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={{ flex: 1 }}>
              <ScrollView
                contentContainerStyle={styles.scrollContent}
                keyboardShouldPersistTaps='handled'
                showsVerticalScrollIndicator={false}
              >
                {/* HEADER */}
                <View style={styles.header}>
                  <Image source={imagePath.icon} style={styles.iconStyle} resizeMode="contain" />
                  <Text style={styles.loginTitle}>Registrarse</Text>
                  <Text style={styles.description}>Complete los siguientes campos para registrarte en nuestra app.</Text>
                </View>

                {/* BODY */}
                <View style={styles.bodyContent}>
                  <View style={styles.inputContainer}>
                    <CustomTextInput
                      placeholder='Nombre/s'
                      value={firstName}
                      onChangeText={setFirstName}
                      keyboardType='default'
                      autoCapitalize='words'
                    />
                    <CustomTextInput
                      placeholder='Apellido/s'
                      value={lastName}
                      onChangeText={setLastName}
                      keyboardType='default'
                      autoCapitalize='words'
                    />
                    <CustomTextInput
                      placeholder='Correo electrónico'
                      value={email}
                      onChangeText={setEmail}
                      keyboardType='email-address'
                      autoCapitalize='none'
                    />
                    <CustomTextInput
                      placeholder='Contraseña'
                      value={password}
                      onChangeText={setPassword}
                      isPassword={true}
                    />
                    <CustomTextInput
                      placeholder='Repita la contraseña'
                      value={confirmPassword}
                      onChangeText={setConfirmPassword}
                      isPassword={true}
                    />
                    <CustomTextInput
                      placeholder='Número de teléfono'
                      value={phoneNumber}
                      onChangeText={setPhoneNumber}
                      keyboardType='phone-pad'
                    />
                  </View>

                  <View style={styles.registerButtonContainer}>
                    <BottomComponent title="Registrarse" onPress={handleRegister} />
                  </View>
                </View>
              </ScrollView>

              {/* FOOTER fijo abajo */}
              <View style={styles.footer}>
                <Text style={styles.footerText}>¿Ya tienes una cuenta?</Text>
                <TouchableOpacity onPress={navigateToLogin}>
                  <Text style={styles.boldText}>Iniciar sesión</Text>
                </TouchableOpacity>
              </View>
            </View>
          </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
      </ImageBackground>

      {/* CustomAlert */}
      <CustomAlert
        visible={alertVisible}
        title={alertConfig.title}
        message={alertConfig.message}
        type={alertConfig.type}
        showCancel={alertConfig.showCancel}
        onConfirm={closeAlert}
        confirmText="Aceptar"
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
    alignItems: 'center',
    paddingHorizontal: moderateScale(20),
    paddingVertical: moderateScale(20),
  },
  scrollContent: {
    paddingBottom: moderateScale(20),
  },
  header: {
    alignItems: 'center',
    gap: moderateScale(20),
    marginBottom: moderateScale(20),
  },
  iconStyle: {
    width: moderateScale(50),
    height: moderateScale(50),
  },
  bodyContent: {
    alignItems: 'center',
    width: '100%',
  },
  loginTitle: {
    color: '#FFFFFF',
    fontSize: moderateScale(35),
    fontFamily: 'Roboto_300Light',
  },
  description: {
    color: '#ffffff',
    textAlign: 'left',
    fontSize: moderateScale(14),
    fontFamily: 'Roboto_300Light',
  },
  inputContainer: {
    gap: moderateScale(5),
    width: moderateScale(330),
    marginBottom: moderateScale(20),
  },
  registerButtonContainer: {
    width: moderateScale(250),
    marginTop: moderateScale(10),
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: moderateScale(10),
    borderTopWidth: 1,
    borderTopColor: '#fff4',
    width: '100%',
  },
  footerText: {
    fontSize: moderateScale(15),
    fontFamily: 'Roboto_300Light',
    color: '#FFFFFF',
    marginRight: moderateScale(5),
  },
  boldText: {
    fontWeight: 'bold',
    color: '#FFFFFF',
    fontSize: moderateScale(15),
    fontFamily: 'Roboto_700Bold',
  },
});

export default RegisterScreen;