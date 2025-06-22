import { useState } from 'react';
import { useFonts } from '@expo-google-fonts/roboto';
import { View, Text, StyleSheet, Image, TouchableOpacity, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import imagePath from '@/constants/imagePath';
import { moderateScale} from 'react-native-size-matters';
import BottomComponent from '@/components/atoms/BottomComponent';
import { router } from 'expo-router';
import { CustomTextInput } from '@/components/atoms/CustomTextInput';
import fonts from '@/constants/fonts';
import { useDispatch } from 'react-redux';
import { registerRequest } from '@/api/authService';
import { setCredentials } from '@/redux/slices/authSlice';
import { storeData } from '@/utils/storage';
import { setUserProfile } from '@/redux/slices/userSlice';

const RegisterScreen = () => {

  const dispatch = useDispatch();
  const [fontsLoaded] = useFonts(fonts);
  const [fullname, setFullname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');

  /*Navegación hacia el login */
  const navigateToLogin = () => {
    router.replace("/(auth)");
  };

  const navigateToOnboarding = () => {
    router.replace("/(main)/(onBoarding)"); //modificar esto para que lleve al onboarding.
  }

  //procesar solicitud de registro
  const handleRegister = async () => {
    try {
      //validaciones de campos
      if (!fullname || !email || !password || !confirmPassword || !phoneNumber) {
        Alert.alert("Uno o más campos están incompletos", "Por favor, completa todos los campos.");
        return;
      }

      //validar que las contraseñas coincidan
      if(password != confirmPassword) {
        Alert.alert("Las contraseñas no coinciden.");
        return;
      }

      // enviar request al backend
      const response = await registerRequest({
        fullname: fullname,
        email: email,
        password : password,
        phoneNumber : phoneNumber
      })

      const token = response.token; //en caso de q se pueda cambiar la respuesta del back, dejar o cambiar el 'token' por el nombre q se le dé
      const user = response.user;

      //seteo token y email en redux
      dispatch(setCredentials({ token, email: user.email}));
      await storeData('auth', { token, email: user.email}); //guardo datos en async storage

      //seteo id, nombre, y numero de tel. en redux
      dispatch(setUserProfile({
        id: user.id,
        fullname: user.name,
        phoneNumber: phoneNumber,
      }));
      await storeData('user', {  //guardo datos en async storage
        id: user.id,
        fullname: user.name,
        phoneNumber: phoneNumber, //esto podría cambiarlo o eliminarlo, ya que depende si viene del backend o no.
      });

      //redirijo al usuario a la pantalla correspondiente
      navigateToOnboarding();

    } catch (e) {
      console.error(e);
      Alert.alert('Error', 'No se pudo registrar el usuario.')
    }
  }

  return (
    <SafeAreaView style={styles.container}>    

      {/* HEADER */}
      <View style={styles.header}>
        <Image source={imagePath.icon} style={styles.iconStyle} resizeMode="contain" />
        <Text style={styles.loginTitle}>Registrarse</Text>
      </View>

      {/* BODY */}
      <View style={styles.bodyContent}>
        <View style={styles.inputContainer}>

          <CustomTextInput
            placeholder='Ingrese su nombre y apellido'
            value={fullname}
            onChangeText={setFullname}
            keyboardType='default'
            autoCapitalize='none'
          />

          <CustomTextInput
            placeholder='Ingrese su correo electrónico'
            value={email}
            onChangeText={setEmail}
            keyboardType='email-address'
            autoCapitalize='none'
          />

          <CustomTextInput
            placeholder='Ingrese una contraseña'
            value={password}
            onChangeText={setPassword}
            isPassword={true}
          />

          <CustomTextInput
            placeholder='Vuelva a ingresar la contraseña'
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            isPassword={true}
          />

          <CustomTextInput
            placeholder='Ingrese un número de teléfono'
            value={phoneNumber}
            onChangeText={setPhoneNumber}
            keyboardType='phone-pad'
          />
        </View>

        <View style={styles.registerButtonContainer}>
          <BottomComponent title="Registrarse" onPress={handleRegister} />
        </View>
      </View>

      {/* FOOTER */}
      <View style={styles.footer}>
        <Text style={styles.footerText}>
          ¿Ya tienes una cuenta?
        </Text>
        <TouchableOpacity onPress={navigateToLogin}>
          <Text style={styles.boldText}>
            Iniciar sesión
          </Text>
        </TouchableOpacity>
      </View>

    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0E3549',
    alignItems: 'center',
    paddingHorizontal: moderateScale(20),
    paddingVertical: moderateScale(20),
  },
  header: {
    alignItems: 'center',
    gap: moderateScale(20),
    marginBottom: moderateScale(40),
  },
  iconStyle: {
    width: moderateScale(50),
    height: moderateScale(50),
  },
  bodyContent: {
    flex: 1,
    alignItems: 'center',
    width: '100%',
  },
  loginTitle: {
    color: '#FFFFFF',
    fontSize: moderateScale(35),
    fontFamily: 'Roboto_300Light',
  },
  inputContainer: {
    gap: moderateScale(5),
    width: moderateScale(330),
    marginBottom: moderateScale(80),
  },
  registerButtonContainer: {
    width: moderateScale(250),
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: moderateScale(10),
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