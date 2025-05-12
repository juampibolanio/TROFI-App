import { View, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

//el boton de configuracion y el de perfil es el que deben modificar cuando quieran que esos botones hagan algo
const HeaderPropio = () => {
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

      <TouchableOpacity onPress={() => console.log('Configuración')}>
        <Ionicons name="settings-outline" size={24} color="#0E3549" />
      </TouchableOpacity>

      <Text style={{ fontSize: 20, fontWeight: 'bold', color: '#1C1C1C' }}>
        TROFI
      </Text>

      <TouchableOpacity onPress={() => console.log('Perfil')}>
        <Ionicons name="person-circle-outline" size={24} color="#0E3549" />
      </TouchableOpacity>
    </View>
  );
};

export default HeaderPropio;
