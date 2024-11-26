import React from 'react';
import { Text, TouchableOpacity, StyleSheet } from 'react-native';



const PrimaryButton = ({ onPress, texto, color, largo, ancho }) => {
  return (
    <TouchableOpacity 
      style={[styles.BtnPrimary, { backgroundColor: color,  width: largo,
        height: ancho, }]} 
      onPress={onPress}  // El evento onPress debe ser pasado como prop
      activeOpacity={0.7} // Controla la opacidad al hacer clic
    >
      <Text style={styles.texto}>{texto}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  BtnPrimary: {
    borderRadius:12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  texto: {
    color: 'white', // Añado este estilo para que el texto sea visible en el botón azul
    fontSize: 14,
  }
});

export default PrimaryButton;
