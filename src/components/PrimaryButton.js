import React from 'react';
import { Text, TouchableOpacity, StyleSheet } from 'react-native';



const PrimaryButton = ({ onPress, texto, color }) => {
  return (
    <TouchableOpacity 
      style={[styles.BtnPrimary, { backgroundColor: color }]} 
      onPress={onPress}  // El evento onPress debe ser pasado como prop
      activeOpacity={0.7} // Controla la opacidad al hacer clic
    >
      <Text style={styles.texto}>{texto}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  BtnPrimary: {
    width: 312,
    height: 36,
    borderRadius:12,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 24,
  },
  texto: {
    color: 'white', // Añado este estilo para que el texto sea visible en el botón azul
    fontSize: 14,
  }
});

export default PrimaryButton;
