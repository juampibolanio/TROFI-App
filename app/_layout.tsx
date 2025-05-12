import { View, Text } from 'react-native'
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
      <Stack screenOptions={() => ({ headerShown: false })}></Stack>
      {isLogin ? <Redirect href="/(main)"/> : <Redirect href="/(main)/(tabs)/destacados" />}
    </>

  );
}

export default RootNavigation;