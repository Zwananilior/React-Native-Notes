import React from 'react';
<<<<<<< HEAD
import { Provider as PaperProvider } from 'react-native-paper';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import AppStack from './navigation/AppStack';
import { DarkThemeProvider } from './utils/theme';
import { JSX } from 'react/jsx-runtime';

export default function App(): JSX.Element {
  return (
    <DarkThemeProvider>
      <PaperProvider>
        <SafeAreaProvider>
          <AppStack />
        </SafeAreaProvider>
      </PaperProvider>
    </DarkThemeProvider>
=======
import { NavigationContainer } from '@react-navigation/native';
import { AuthProvider, useAuth } from './src/utils/auth';
import AuthStack from './src/navigation/AuthStack';
import MainStack from './src/navigation/MainStack';
import { ActivityIndicator, View } from 'react-native';

const Root = () => {
  const { initializing, user } = useAuth();
  if (initializing) {
    return (<View style={{flex:1,justifyContent:'center',alignItems:'center'}}><ActivityIndicator size="large" /></View>);
  }
  return (
    <NavigationContainer>
      {user ? <MainStack /> : <AuthStack />}
    </NavigationContainer>
  );
};

export default function App() {
  return (
    <AuthProvider>
      <Root />
    </AuthProvider>
>>>>>>> 36d06f57e01096206aa8f6a06b7798b7e84d2e39
  );
}
