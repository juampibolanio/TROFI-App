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
  UIManager,
} from 'react-native';
import { moderateScale, verticalScale } from 'react-native-size-matters';
import {
  Roboto_300Light,
  Roboto_400Regular,
  Roboto_700Bold,
  useFonts,
} from '@expo-google-fonts/roboto';
import imagePath from '@/constants/imagePath';

// Activar animaciones para Android
if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

const AboutTrofi = () => {
  const [fontsLoaded] = useFonts({
    Roboto_400Regular,
    Roboto_700Bold,
    Roboto_300Light,
  });

  const [isExpanded, setIsExpanded] = useState(false);
  const toggleExpand = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setIsExpanded(!isExpanded);
  };

  if (!fontsLoaded) return null;

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Image source={imagePath.icon} style={styles.icon} />
      </View>

      <View style={styles.content}>
        <TouchableOpacity style={styles.button} onPress={toggleExpand}>
          <Text style={styles.buttonText}>Acerca de TROFI</Text>
        </TouchableOpacity>

        {isExpanded && (
          <View style={styles.drawerBox}>
            <Text style={styles.drawerText}>
              La aplicación TROFI es una herramienta para quienes buscan trabajos y oficios, ya sea en áreas como electricidad, albañilería, plomería y más. También es ideal para quienes desean ofrecer sus servicios y construir un perfil profesional con acceso a nuevos clientes. ¿Buscás un profesional confiable? TROFI te conecta con los mejores, con reseñas, experiencia y precios claros.
            </Text>
          </View>
        )}

        <View style={styles.infoBox}>
          <Text style={styles.versionText}>Versión 1.0.0.0</Text>
          <Text style={styles.updateText}>Última actualización: 20/05/2025</Text>
          <Text style={styles.updateText}>Desarrollado por: CuperCode</Text>
          <Text style={styles.updateText}>Contacto: 3625000012</Text>
        </View>
      </View>

      <View style={styles.footer}>
        <Text style={styles.rightsText}>©2025 TROFI. Todos los derechos reservados.</Text>
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
  },
  icon: {
    width: moderateScale(50),
    height: moderateScale(50),
    resizeMode: 'contain',
  },
  content: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: moderateScale(20),
    paddingTop: verticalScale(10),
  },
  button: {
    backgroundColor: '#E5E5E5',
    paddingVertical: verticalScale(12),
    paddingHorizontal: moderateScale(30),
    borderRadius: moderateScale(30),
    marginBottom: verticalScale(20),
    elevation: 4,
  },
  buttonText: {
    color: '#0E3549',
    fontFamily: 'Roboto_700Bold',
    fontSize: moderateScale(14),
  },
  drawerBox: {
    backgroundColor: '#165776',
    borderRadius: moderateScale(20),
    padding: moderateScale(16),
    marginBottom: verticalScale(20),
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    elevation: 5,
    width: '100%',
  },
  drawerText: {
    color: '#FFFFFF',
    fontSize: moderateScale(13),
    fontFamily: 'Roboto_300Light',
    lineHeight: moderateScale(18),
    textAlign: 'justify',
  },
  infoBox: {
    backgroundColor: 'rgba(255, 255, 255, 0.04)',
    borderRadius: moderateScale(14),
    padding: moderateScale(12),
    width: '100%',
    alignItems: 'flex-start',
    gap: verticalScale(4),
  },
  versionText: {
    color: '#FFFFFF',
    fontFamily: 'Roboto_400Regular',
    fontSize: moderateScale(13),
  },
  updateText: {
    color: '#FFFFFF',
    fontFamily: 'Roboto_300Light',
    fontSize: moderateScale(11),
  },
  rightsText: {
    color: '#FFFFFF',
    fontFamily: 'Roboto_300Light',
    fontSize: moderateScale(11),
    textAlign: 'center',
  },
  footer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: verticalScale(12),
  },
});

export default AboutTrofi;
