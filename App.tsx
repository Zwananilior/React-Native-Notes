import React from 'react';
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
  );
}
