import { Tabs } from 'expo-router';
import { View, Text } from 'react-native';

import { BuscarIcon, PerfilIcon, MensajeIcon, DestacadosIcon } from '../../../components/atoms/icon';
import HeaderPropio from '@/components/headerTrofi';

// esto es pa que el boton seleccionado tenga fondo, si lo
// hacia de manera separada uno por uno tenia que configurar
// el label(texto) y el icon de manera separada y quedaba desprolijo
// A DISCUTIR: mover esto a la carpeta de componentes?
const TabBarIcon = ({ icon: IconComponent, label, focused }: any) => (
  <View
    style={{
      backgroundColor: focused ? '#AAB1B6' : 'transparent',
      paddingVertical: 4,
      paddingHorizontal:12,
      borderRadius: 20,
      alignItems: 'center',
      justifyContent: 'center',
      marginTop: 19,
    }}
  >
    <IconComponent color="#0E3549" />
    <Text
      style={{
        fontSize: 12,
        color: '#0E3549',
        fontWeight: '500',
        marginTop: 2,
        textAlign: 'center',
      }}
    >
      {label}
    </Text>
  </View>
);

export default function TabsLayout(){
  return(
    <Tabs
      screenOptions={{
        header: () => <HeaderPropio/>,
        tabBarLabelPosition: 'below-icon',
        tabBarShowLabel: false,
        tabBarStyle: {
          backgroundColor: '#D9D9D9',
          borderTopWidth: 0,
          height: 60, 
          overflow: 'hidden',
        },
      }}
      >
      <Tabs.Screen
        name="destacados"
        options={{
          tabBarIcon: ({ focused }) => (
            <TabBarIcon icon={DestacadosIcon} label="Destacados" focused={focused} />
          ),
        }}
      />
      <Tabs.Screen
        name="buscar"
        options = {{
          title: 'Buscar',
          tabBarIcon: ({focused}) => (
            <TabBarIcon icon={BuscarIcon} label = "Buscar" focused={focused} />
          ),
        }}
      />
      <Tabs.Screen
        name="mensajes"
        options = {{
          title: 'Mensajes',
          tabBarIcon: ({focused}) => (
            <TabBarIcon icon={MensajeIcon} label = "Mensajes" focused={focused} />
          ),
        }}
      />
      <Tabs.Screen
        name="perfil"
        options = {{
          title: 'Mi Perfil',
          tabBarIcon: ({focused}) => (
            <TabBarIcon icon={PerfilIcon} label = "Perfil" focused={focused} />
          ),
        }}
      />
    </Tabs>
  )
}