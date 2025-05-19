import { View, Text } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Redirect, SplashScreen, Stack } from 'expo-router'

const RootNavigation = () => {

  const [isLogin, setIsLogin] = useState(false);

  useEffect(() => {
    SplashScreen.hideAsync();
  })
  return (

    <>
      <Stack screenOptions={() => ({ headerShown: false })}></Stack>
      {isLogin ? <Redirect href="/(main)"/> : <Redirect href="/(auth)/passwordRecoveryTwo" />}
    </>

  );
}

export default RootNavigation;