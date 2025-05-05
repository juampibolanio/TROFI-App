import React from 'react';
import { Roboto_300Light, Roboto_400Regular, Roboto_700Bold, useFonts } from '@expo-google-fonts/roboto';
import { View, Text, StyleSheet, ImageBackground, Image, TextInput, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import imagePath from '@/constants/imagePath';
import { moderateScale, verticalScale } from 'react-native-size-matters'; 
import BottomComponent from '@/components/atoms/BottomComponent';
import { router } from 'expo-router'; 

const RegisterScreen = () => {

  const [fontsLoaded] = useFonts({
    Roboto_400Regular,
    Roboto_700Bold,
    Roboto_300Light
  });

  const navigateToLogin = () => {
    router.push("/(auth)");
  };

  /* ACÁ FALTA AGREGAR LAS X EN LOS INPUTS Y EL OJO PARA VER O NO LA CONTRASEÑA */
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
          <TextInput
            placeholder='Ingrese su nombre/email'
            style={styles.input}
            placeholderTextColor="#F5F0F0"
          />

          <TextInput
            placeholder='Ingrese una contraseña'
            style={styles.input}
            placeholderTextColor="#F5F0F0"
            secureTextEntry 
          />

          <TextInput
            placeholder='Confirme la contraseña'
            style={styles.input}
            placeholderTextColor="#F5F0F0"
            secureTextEntry 
          />

          <TextInput
            placeholder='Ingrese un teléfono'
            style={styles.input}
            placeholderTextColor="#F5F0F0"
            keyboardType="phone-pad"
          />
        </View>

        <View style={styles.registerButtonContainer}>
          <BottomComponent title="Registrarse" onPress={() => { }}/>
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
    gap: moderateScale(20),
    width: moderateScale(280),
    marginBottom: moderateScale(80), 
  },
  input: {
    backgroundColor: 'rgba(164, 148, 148, 0.4)',
    borderWidth: moderateScale(1),
    borderColor: '#FFFFFF',
    borderRadius: moderateScale(1.5),
    borderLeftWidth: moderateScale(5),
    paddingHorizontal: moderateScale(10),
    color: '#FFFFFF',
    height: verticalScale(40),
  },
  registerButtonContainer: {
      width: moderateScale(250), 
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center', 
    alignItems: 'center', 
    marginTop: moderateScale(30), 
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