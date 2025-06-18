import { router, Tabs } from 'expo-router';
import { View, Text } from 'react-native';
import { BuscarIcon, PerfilIcon, MensajeIcon, DestacadosIcon } from '@/components/atoms/icon';
import HeaderPropio from '@/components/headerTrofi';
import { moderateScale } from 'react-native-size-matters';
import TabBarIcon from '@/components/tabBarIcon';


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
          borderRadius: moderateScale(10),
        },
      }}
      >

      <Tabs.Screen
        name="featured"
        options={{
          tabBarIcon: ({ focused }) => (
            <TabBarIcon icon={DestacadosIcon} label='Destacados' focused={focused} />
          ),
        }}
      />
      <Tabs.Screen
        name="search"
        options = {{
          title: 'Buscar',
          tabBarIcon: ({focused}) => (
            <TabBarIcon icon={BuscarIcon} label = 'Buscar' focused={focused} />
          ),
        }}
      />
      <Tabs.Screen
        name="messages"
        options = {{
          title: 'Mensajes',
          tabBarIcon: ({focused}) => (
            <TabBarIcon icon={MensajeIcon} label = 'Mensajes' focused={focused} />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options = {{
          title: 'Mi Perfil',
          tabBarIcon: ({focused}) => (
            <TabBarIcon icon={PerfilIcon} label = 'Mi Perfil' focused={focused} />
          ),
        }}
      />

    </Tabs>
  )
}