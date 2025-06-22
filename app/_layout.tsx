import { View, Text, StatusBar } from 'react-native'
import { useEffect, useState } from 'react'
import { Redirect, SplashScreen, Stack } from 'expo-router'
import { Provider, useDispatch } from 'react-redux';
import { store } from '../redux/store';
import { getData } from '@/utils/storage';
import { setCredentials } from '@/redux/slices/authSlice';
import { setUserProfile } from '@/redux/slices/userSlice';

//este app loader hay que mover a componente. Esto verifica si hay sesión y redirige al usuario según corresponda
const AppLoader = () => {

  const [isLoading, setIsLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const dispatch = useDispatch();

  //obtener datos del storage para verificar si hay sesión
  useEffect(() => {
    const prepare = async () => {
      try {
        await SplashScreen.hideAsync();

        const tokenData = await getData('auth');
        const profileData = await getData('user');

        if (tokenData?.token && tokenData?.email) {
          dispatch(setCredentials(tokenData));
          dispatch(setUserProfile(profileData || {}));
          setIsLoggedIn(true);
        }

      } catch (e) {
        console.log('Hubo un error.', e);
      } finally {
        setIsLoading(false);
      }
    };

    prepare();
  }, []);

  if (isLoading) return null;

  return isLoggedIn
    ? <Redirect href="/(main)/(tabs)/featured" />
    : <Redirect href="/(main)/(auth)" />;
};

//este root navigation es el que carga a la app
const RootNavigation = () => {
  return (
    <>
      <StatusBar backgroundColor="#0E3549" barStyle="light-content" />
      <Provider store={store}>
        <Stack screenOptions={{ headerShown: false }} />
        <AppLoader />
      </Provider>
    </>
  )
};

export default RootNavigation;