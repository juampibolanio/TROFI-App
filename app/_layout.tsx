import { View, Text, StatusBar } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Redirect, SplashScreen, Stack } from 'expo-router'
  
const RootNavigation = () => {

  const [isLogin, setIsLogin] = useState(false);

  useEffect(() => {
    SplashScreen.hideAsync();
  })
  return (
    // modifiquen esto para que los manden a las rutas que necesiten
    // yo lo dejo asi para que vean como hacerlo, si lo vuelven a (auth)
    // la app comienza normalmente
    <>
      {/*configuro acá la barra de estado */}
      {/*ESTA PUESTO PARA LA VISTA QUE ESTOY HACIENDO AHORA EL HREF SETTINGS */}
      <StatusBar backgroundColor="#0E3549" barStyle="light-content" />
      <Stack screenOptions={{headerShown: false}} />
      {isLogin
        ? <Redirect href="/(main)/(tabs)/featured" />
        : <Redirect href="/(settings)/termsAndConditions" />}
    </>

  );
}

export default RootNavigation;