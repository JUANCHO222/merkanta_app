// In App.js in a new project
import * as React from 'react';
import { StackNavigator } from './src/routes/StackNavigator';
import {SafeAreaView, StyleSheet} from 'react-native'
import { StatusBar } from 'expo-status-bar';

function App() {
  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar style="light" translucent={false}/>
      <StackNavigator/>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#D9D9D9', // Color de fondo de la barra de estado
},
});


export default App;