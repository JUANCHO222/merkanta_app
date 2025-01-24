import React, {useState} from 'react';
import { StyleSheet} from 'react-native'
import { AppNavigator } from './src/routes/StackNavigator';
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

      <AppNavigator/>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#D9D9D9', // Color de fondo de la barra de estado
},
});

export default App;
