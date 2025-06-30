import { View, Text, TouchableOpacity, ActivityIndicator, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import fonts from '@/constants/fonts'
import { useFonts } from '@expo-google-fonts/roboto';
import { router, useRouter } from 'expo-router';


const HeaderTrofi = () => {
  const [fontsLoaded] = useFonts(fonts);

  if (!fontsLoaded) return null;
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

      <TouchableOpacity onPress={() => router.push('/(main)/(tabs)/settings')}>
        <Ionicons name="settings-outline" size={24} color="#0E3549" />
      </TouchableOpacity>


      <Text style={{ fontSize: 24, color: '#1C1C1C', fontFamily: 'Bauhaus93' }}>
        TROFI
      </Text>

      <TouchableOpacity onPress={() => router.push('/(main)/(tabs)/profile')}>
        <Ionicons name="person-circle-outline" size={24} color="#0E3549" />
      </TouchableOpacity>
    </View>
  );
};

export default HeaderTrofi;
