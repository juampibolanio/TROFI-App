import {
  SafeAreaView,
  ScrollView,
  Text,
  View,
  StyleSheet,
  Dimensions,
} from 'react-native';
import {
  useFonts,
  Roboto_400Regular,
  Roboto_700Bold,
  Roboto_300Light,
} from '@expo-google-fonts/roboto';
import { moderateScale, verticalScale } from 'react-native-size-matters';

const TermsAndConditions = () => {
  const [fontsLoaded] = useFonts({
    Roboto_400Regular,
    Roboto_700Bold,
    Roboto_300Light,
  });

  if (!fontsLoaded) return null;

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.inner}>
        <View style={styles.header}>
          <Text style={styles.title}>Términos y Condiciones</Text>
          <View style={styles.titleUnderline} />
        </View>

        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          <View style={styles.card}>
            <Text style={styles.bodyText}>
              Bienvenido a TROFI, una plataforma diseñada para facilitar la conexión entre personas que buscan trabajo y quienes necesitan contratar servicios profesionales de forma rápida, simple y segura. Al utilizar TROFI, aceptás estos Términos y Condiciones. TROFI actúa como intermediario digital. No somos responsables de los acuerdos comerciales entre usuarios, ni garantizamos el resultado de los servicios contratados. Cada usuario es responsable de la información que publica y del cumplimiento de sus compromisos. No asumimos responsabilidad por comportamientos indebidos o incumplimientos. La información personal que brindás será tratada de forma confidencial y segura, y será utilizada únicamente con fines operativos dentro de la app. Está prohibido el uso de TROFI con fines fraudulentos, ilegales o que vulneren la buena convivencia digital. TROFI se reserva el derecho de suspender usuarios que infrinjan esta política. Los términos pueden ser modificados sin previo aviso. Te recomendamos consultarlos periódicamente. Para consultas, escribinos a contacto@trofiapp.com. Gracias por ser parte de TROFI.
            </Text>
          </View>
        </ScrollView>

        <View style={styles.footer}>
          <Text style={styles.footerText}>©2025 TROFI. Todos los derechos reservados.</Text>
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
  inner: {
    flex: 1,
    paddingHorizontal: moderateScale(20),
    paddingTop: verticalScale(30),
  },
  header: {
    alignItems: 'center',
    marginBottom: verticalScale(20),
  },
  title: {
    fontSize: moderateScale(22),
    fontFamily: 'Roboto_700Bold',
    color: '#fff',
  },
  titleUnderline: {
    width: moderateScale(100),
    height: 2,
    backgroundColor: '#fff',
    marginTop: verticalScale(6),
    borderRadius: 2,
  },
  scrollContent: {
    paddingBottom: verticalScale(30),
    alignItems: 'center',
  },
  card: {
    backgroundColor: '#165776',
    borderRadius: moderateScale(20),
    padding: moderateScale(16),
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 8,
    elevation: 5,
    width: '100%',
  },
  bodyText: {
    fontSize: moderateScale(13),
    fontFamily: 'Roboto_300Light',
    color: '#FFFFFF',
    textAlign: 'justify',
    lineHeight: moderateScale(18),
  },
  footer: {
    alignItems: 'center',
    marginTop: verticalScale(10),
    paddingVertical: verticalScale(10),
  },
  footerText: {
    color: '#FFFFFF',
    fontFamily: 'Roboto_300Light',
    fontSize: moderateScale(10),
    textAlign: 'center',
  },
});

export default TermsAndConditions;
