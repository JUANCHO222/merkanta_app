import React, {useState} from 'react';
import {SafeAreaView, StyleSheet} from 'react-native'
import { StatusBar } from 'expo-status-bar';
import { AppNavigator } from './src/routes/StackNavigator';
import { ApolloProvider } from '@apollo/client';
import client from './src/apollo/client'; // Asegúrate de importar tu cliente Apollo
import { useFonts } from 'expo-font';
const App = () => {
   const [fontsLoaded] = useFonts({
      'Montserrat-Bold': require('./assets/fonts/Montserrat-Bold.ttf'),
      'Montserrat': require('./assets/fonts/Montserrat-Light.ttf')
    })
  
    if (!fontsLoaded) {
      return null;
    }
    
    
  return (

    <ApolloProvider client={client}>
      <AppNavigator/>
    </ApolloProvider>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#D9D9D9', // Color de fondo de la barra de estado
},
});

export default App;
