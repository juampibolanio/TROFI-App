// app/_layout.tsx

import { StatusBar } from 'react-native';
import { Provider } from 'react-redux';
import { store } from '../redux/store';
import AppLoader from '@/components/AppLoader';
import { Stack } from 'expo-router';

export const linking = {
  prefixes: ['myapp://'], 
  config: {
    screens: {
      'reset-password': 'reset-password',
    },
  },
};

const RootNavigation = () => {
  return (
    <>
      <StatusBar backgroundColor="#0E3549" barStyle="light-content" />
      <Provider store={store}>
        <Stack screenOptions={{ headerShown: false }} />
        <AppLoader />
      </Provider>
    </>
  );
};

export default RootNavigation;
