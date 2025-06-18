import { View, Text, TouchableOpacity, ActivityIndicator, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import fonts from '@/constants/fonts'
import { useFonts } from '@expo-google-fonts/roboto';
import { moderateScale } from 'react-native-size-matters';
import { router, useRouter } from 'expo-router';

//el boton de configuracion y el de perfil es el que deben modificar cuando quieran que esos botones hagan algo
const HeaderPropio = () => {
  const [fontsLoaded] = useFonts(fonts);

  const router = useRouter();


  return (
    <View
      style={{
        height: 60,
        backgroundColor: '#D9D9D9',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 16,
      }}
    >

      <Pressable onPress={() => {}}>
        <Ionicons name="person-circle-outline" size={30} color="#0E3549" />
      </Pressable>

      <Text style={{ fontSize: 24, color: '#1C1C1C', fontFamily: 'Bauhaus93', marginTop: moderateScale(1)}}>
        TROFI
      </Text>

      <TouchableOpacity onPress={() => {}}>
        <Ionicons name="settings-outline" size={24} color="#0E3549" />
      </TouchableOpacity>
    </View>
  );
};

export default HeaderPropio;
